# SPRING_BOOT_MIGRATION.md

Huong dan port **backend-assessment (NestJS/TypeScript)** sang **Spring Boot (Java/Kotlin)**.

---

## 1. API Contract on dinh

| Endpoint | Method | Request | Response |
|----------|--------|---------|----------|
| /api/v1/assessments/definition | GET | - | DefinitionDTO |
| /api/v1/assessments/riasec | GET | - | RiasecQuestionsDTO |
| /api/v1/assessments/mbti | GET | - | MbtiQuestionsDTO |
| /api/v1/assessments/experience-domains | GET | - | List<ExperienceDomainDTO> |
| /api/v1/assessments/experience-domains/{id} | GET | - | ExperienceDomainDetailDTO |
| /api/v1/assessments/evaluate | POST | AssessmentInputDTO | AssessmentReportDTO |
| /api/v1/assessments/demo-personas | GET | - | List<DemoPersonaDTO> |
| /api/v1/assessments/evaluate-demo/{personaId} | POST | - | AssessmentReportDTO |

---

## 2. Enums (Java)

```java
public enum RiasecCode { R, I, A, S, E, C }
public enum MbtiPole   { E, I, S, N, T, F, J, P }
public enum MbtiAxis   { EI, SN, TF, JP }

public enum ExperienceRecency    { LAST_3_MONTHS, LAST_YEAR, OLDER }
public enum ExperienceFrequency  { FEW_TIMES, SOMETIMES, MONTHLY, WEEKLY_PLUS }
public enum ExperienceMotivation { VOLUNTARY, MIXED, REQUIRED }
public enum ExperienceRole       { OBSERVER, MEMBER, CORE, LEAD }
public enum ExperienceOutcome    { NONE, PRODUCT, EXPERT_FEEDBACK, AWARD_PUBLIC }
public enum ArtifactStatus       { UNVERIFIED }
public enum DataStatus           { DEMO }
public enum ConfidenceLabel      { HIGH, MEDIUM, LOW }
```

---

## 3. Request / Response DTOs

```java
// ---- Input ----
public record ExperienceAnswerDTO(
    String domainId, ExperienceRecency recency, ExperienceFrequency frequency,
    ExperienceMotivation motivation, ExperienceRole role, ExperienceOutcome outcome,
    @Nullable String artifact,
    @Nullable Map<String, Boolean> realityAnswers
) {}

public record AssessmentInputDTO(
    @Nullable String userId,
    @Nullable Boolean paidAttempt,
    Map<String, Integer> riasecAnswers,     // { "R01": 4 }
    Map<String, MbtiPole> mbtiAnswers,      // { "EI01": I }
    ExperiencePayloadDTO experience,
    @Nullable ProfileDTO profile,
    @Nullable String selectedMajorId
) {}

public record ExperiencePayloadDTO(
    @Nullable Boolean noExperience,
    @Nullable List<ExperienceAnswerDTO> domains
) {}

public record ProfileDTO(
    @Nullable String admissionYear,
    @Nullable List<String> regions,
    @Nullable String tuitionRange,
    @Nullable List<String> strengths,
    @Nullable Double gpa,
    @Nullable List<String> priorities
) {}

// ---- Output ----
public record ComponentScoreDTO(
    @Nullable Double score,
    double weight, double effectiveWeight, String reason
) {}

public record RankedMajorDTO(
    String majorId, String name,
    double fitScore, double confidenceScore, ConfidenceLabel confidenceLabel,
    Map<String, ComponentScoreDTO> components,
    List<String> reasons, List<String> tradeoffs, List<String> nextActions
) {}

public record AssessmentReportDTO(
    String id, String assessmentVersion, String scoringModelVersion, String generatedAt,
    Object overview, Object onePageProfile, Object crossEvidence,
    List<RankedMajorDTO> majors,           // always 6
    RankedMajorDTO selectedMajorDetail,
    List<Object> schoolMatch,
    Object nextSteps,
    List<String> qualityFlags,
    AttemptDTO attempt
) {}
```

---

## 4. Cong thuc (tat ca pure function, khong phu thuoc framework)

### RIASEC
```
rawAverage[domain] = sum(ratings) / 5
normalizedScore[domain] = ((rawAverage - 1) / 4) * 100   // [0, 100]
CLOSE_RANGE flag khi top1 - top2 < 5
```

### MBTI
```
axisClarity = abs(leftCount - rightCount) / 15 * 100
CLEAR >= 40 | MODERATE >= 20 | BORDERLINE < 20
```

### Experience
```
baseScore = 0.20*recency + 0.25*frequency + 0.20*motivation + 0.20*role + 0.15*outcome
finalScore = realityTriggered ? 0.85*base + 0.15*reality : base
realityTriggered = frequency in {MONTHLY,WEEKLY_PLUS} AND role in {CORE,LEAD} AND outcome in {EXPERT_FEEDBACK,AWARD_PUBLIC}
```

### MajorFit
```
weights = { riasec:0.30, academic:0.20, evidence:0.20, mbti:0.15, environment:0.10, practical:0.05 }
Neu component = null -> effectiveWeight = 0, renormalize weights con lai
fitScore = sum(score[k] * effectiveWeight[k])
```

### Confidence
```
confidence = 0.30*completeness + 0.25*quality + 0.25*agreement + 0.20*evidenceStrength
HIGH>=75 | MEDIUM>=50 | LOW<50
```

---

## 5. Xu ly Null

- Component thieu du lieu -> `score = null`, `effectiveWeight = 0`.
- Active weight = tong weight cac component co score != null.
- `effectiveWeight[k] = weight[k] / activeWeight`.
- `fitScore = sum(score[k] * effectiveWeight[k])`.
- Confidence giam khi nhieu component null.

---

## 6. Version Fields

```java
String ASSESSMENT_VERSION     = "2026.1";
String SCORING_MODEL_VERSION  = "direction-snapshot-1.0.0";
```

Luu trong moi report de khong mat tracking khi upgrade model.

---

## 7. Test Vectors (dung de kiem tra port)

| Case | Input | Expected |
|------|-------|----------|
| All RIASEC = 1 | moi domain 5 cau rating 1 | moi domain score = 0 |
| All RIASEC = 5 | moi domain 5 cau rating 5 | moi domain score = 100 |
| All RIASEC = 3 | moi domain 5 cau rating 3 | moi domain score = 50 |
| MBTI 8E/7I | 8 cau chon E, 7 cau chon I | clarityLabel = BORDERLINE |
| Experience FEW_TIMES/MEMBER/PRODUCT | base formula | 71.5 |
| No experience | noExperience=true | LIMITED_EXPERIENCE flag, 6 majors van co |
| Report always 6 | any valid input | majors.length == 6 |
| Deterministic | same input twice | same report id, same scores |

---

## 8. Services can port

| NestJS Service | Spring Boot equivalent |
|----------------|----------------------|
| `scoring.ts: scoreRiasec()` | `RiasecScoringService` |
| `scoring.ts: scoreMbti()` | `MbtiScoringService` |
| `scoring.ts: scoreExperience()` | `ExperienceScoringService` |
| `scoring.ts: evaluateAssessment()` | `AssessmentEvaluationService` |
| `assessment.service.ts: validate()` | `AssessmentValidationService` (Bean Validation) |
| `assessment.service.ts: evaluate()` | `AssessmentService` |
| `assessment.data.ts` | `QuestionRepository` (JSON files hoac DB) |

---

## 9. Khong phu thuoc NestJS

- Scoring logic hoan toan la pure functions trong `scoring.ts`.
- Khong dung `@Injectable` trong scoring core.
- Data la constant arrays, khong phu thuoc DI.
- Port scoring sang Java: chi can convert TypeScript -> Java, khong phu thuoc goi NestJS nao.

---

## 10. Schema data cho Spring Boot

Data hien tai trong `assessment.data.ts` co the xuat thanh:
- JSON files doc tu classpath (`src/main/resources/data/`).
- Hoac bang trong DB voi schema:

```sql
CREATE TABLE riasec_questions (id VARCHAR PRIMARY KEY, domain CHAR(1), text TEXT, example TEXT);
CREATE TABLE mbti_questions (id VARCHAR PRIMARY KEY, dimension VARCHAR(2), prompt TEXT, left_label TEXT, right_label TEXT, left_pole CHAR(1), right_pole CHAR(1));
CREATE TABLE major_profiles (id VARCHAR PRIMARY KEY, name TEXT, riasec_weights JSONB, academic_subjects TEXT[], evidence_domains TEXT[], mbti_letters TEXT[], environments TEXT[], tuition_bands TEXT[], tradeoffs TEXT[], next_actions TEXT[]);
```

---

## 11. Report Snapshot

Luu kem:
- `inputSnapshot`: ban sao du lieu dau vao tai thoi diem submit.
- `assessmentVersion`: de biet bai test nao duoc dung.
- `scoringModelVersion`: de biet cong thuc tinh nao.
- `generatedAt`: ISO 8601 UTC.
