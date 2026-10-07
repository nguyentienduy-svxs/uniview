# FRONTEND_INTEGRATION.md

Tài liệu tích hợp giữa **frontend UniView (Vite + React)** và **backend-assessment (NestJS)**.

---

## 1. Base URL

```
http://localhost:8081/api/v1/assessments
```

Thay bằng env-var trong production:
```ts
const API_BASE = import.meta.env.VITE_ASSESSMENT_API ?? 'http://localhost:8081/api/v1/assessments'
```

---

## 2. Endpoints theo từng bước

| Bước | Endpoint | Method | Mục đích |
|------|----------|--------|----------|
| Khởi tạo | `/definition` | GET | Lấy version, số câu, disclaimers |
| Bước 1 | `/riasec` | GET | 30 câu RIASEC (không expose domain) |
| Bước 2 | `/mbti` | GET | 60 câu MBTI-style + disclaimer |
| Bước 3 | `/experience-domains` | GET | 8 domain level-1 |
| Bước 3 | `/experience-domains/:domainId` | GET | Chi tiết + reality-check questions |
| Submit | `/evaluate` | POST | Gửi toàn bộ input, nhận report |
| Demo | `/demo-personas` | GET | Danh sách persona demo |
| Demo | `/evaluate-demo/:personaId` | POST | Chạy report với persona demo |

---

## 3. TypeScript Interfaces

```ts
type RiasecCode = 'R' | 'I' | 'A' | 'S' | 'E' | 'C'
type MbtiPole   = 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P'

type ExperienceRecency    = 'LAST_3_MONTHS' | 'LAST_YEAR' | 'OLDER'
type ExperienceFrequency  = 'FEW_TIMES' | 'SOMETIMES' | 'MONTHLY' | 'WEEKLY_PLUS'
type ExperienceMotivation = 'VOLUNTARY' | 'MIXED' | 'REQUIRED'
type ExperienceRole       = 'OBSERVER' | 'MEMBER' | 'CORE' | 'LEAD'
type ExperienceOutcome    = 'NONE' | 'PRODUCT' | 'EXPERT_FEEDBACK' | 'AWARD_PUBLIC'

interface RiasecQuestion { id: string; text: string; example: string }
interface MbtiQuestion   { id: string; dimension: string; prompt: string; options: [{label:string;value:MbtiPole},{label:string;value:MbtiPole}] }
interface ExperienceDomain { id: string; name: string; icon: string }
interface ExperienceDomainDetail extends ExperienceDomain { realityCheck: Array<{id:string;text:string}> }

interface ExperienceAnswerPayload {
  domainId: string; recency: ExperienceRecency; frequency: ExperienceFrequency
  motivation: ExperienceMotivation; role: ExperienceRole; outcome: ExperienceOutcome
  artifact?: string; realityAnswers?: Record<string, boolean>
}

interface AssessmentPayload {
  userId?: string; paidAttempt?: boolean
  riasecAnswers: Record<string, number>   // { R01: 4, I01: 3 ... }
  mbtiAnswers:   Record<string, MbtiPole> // { EI01: 'I', SN01: 'S' ... }
  experience: { noExperience?: boolean; domains?: ExperienceAnswerPayload[] }
  profile?: { admissionYear?: string; regions?: string[]; tuitionRange?: string; strengths?: string[]; gpa?: number; priorities?: string[] }
  selectedMajorId?: string
}

interface ComponentScore { score: number | null; weight: number; effectiveWeight: number; reason: string }
interface RankedMajor {
  majorId: string; name: string; fitScore: number
  confidenceScore: number; confidenceLabel: 'HIGH' | 'MEDIUM' | 'LOW'
  components: Record<string, ComponentScore>; reasons: string[]; tradeoffs: string[]; nextActions: string[]
}
interface AssessmentReport {
  id: string; assessmentVersion: string; scoringModelVersion: string; generatedAt: string
  overview: unknown; onePageProfile: unknown; crossEvidence: unknown
  majors: RankedMajor[]           // luon dung 6
  selectedMajorDetail: RankedMajor; schoolMatch: unknown[]
  nextSteps: unknown; qualityFlags: string[]; attempt: { consumed: boolean; remaining: number | null }
}
```

---

## 4. API Client

```ts
// src/api/assessmentClient.ts
const BASE = import.meta.env.VITE_ASSESSMENT_API ?? 'http://localhost:8081/api/v1/assessments'

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, { headers: { 'Content-Type': 'application/json' }, ...init })
  const body = await res.json()
  if (!res.ok) throw Object.assign(new Error(body.message ?? 'API error'), { code: body.code, details: body.errors })
  return body as T
}

export const assessmentApi = {
  definition:        () => apiFetch('/definition'),
  riasecQuestions:   () => apiFetch('/riasec'),
  mbtiQuestions:     () => apiFetch('/mbti'),
  experienceDomains: () => apiFetch('/experience-domains'),
  experienceDomain:  (id: string) => apiFetch(`/experience-domains/${id}`),
  evaluate:          (payload: AssessmentPayload) => apiFetch('/evaluate', { method: 'POST', body: JSON.stringify(payload) }),
  demoPersonas:      () => apiFetch('/demo-personas'),
  evaluateDemo:      (personaId: string) => apiFetch(`/evaluate-demo/${personaId}`, { method: 'POST' }),
}
```

---

## 5. Autosave Draft

```ts
const DRAFT_KEY = 'uniview_assessment_draft'
const saveDraft  = (s: Partial<AssessmentPayload>) => localStorage.setItem(DRAFT_KEY, JSON.stringify({ ...s, savedAt: new Date().toISOString() }))
const loadDraft  = (): Partial<AssessmentPayload> | null => { try { return JSON.parse(localStorage.getItem(DRAFT_KEY) ?? 'null') } catch { return null } }
const clearDraft = () => localStorage.removeItem(DRAFT_KEY)
```

---

## 6. Submit

```ts
async function submitAssessment(state: AssessmentPayload): Promise<AssessmentReport> {
  const report = await assessmentApi.evaluate(state)
  clearDraft()
  return report
}
```

Truyền `paidAttempt: true` CHI KHI nguoi dung da thanh toan. Backend chi consume attempt sau khi report tao thanh cong.

---

## 7. Render Loading / Error

```tsx
if (status === 'loading') return <Spinner message="Dang tao Direction Snapshot..." />
if (status === 'error')   return <ErrorBanner message={errorMsg} />
if (status === 'done')    return <ReportView report={report!} />
```

---

## 8. Cach nguoi dung tim thay cau chua tra loi

```ts
const missing = questions.filter(q => !answers[q.id]).map(q => q.id)
// Hien thi badge so cau con thieu tren step header
```

---

## 9. Thay mock data bang API (adapter pattern)

```ts
// src/hooks/useRiasecQuestions.ts
export function useRiasecQuestions() {
  return useQuery({
    queryKey: ['riasec'],
    queryFn: () => assessmentApi.riasecQuestions().catch(() => ({ questions: RIASEC_MOCK })),
    staleTime: Infinity,
  })
}
```

---

## 10. Gioi han demo

- Backend in-memory: restart = mat report cu.
- School data: `dataStatus = "DEMO"`.
- Artifact URL: luu nhung khong verify.
- Chua co auth middleware.
