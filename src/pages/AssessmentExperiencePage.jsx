import { useNavigate } from 'react-router-dom'

import AssessmentStepShell from '../components/assessment/AssessmentStepShell'
import { BASE_EVIDENCE_QUESTIONS, DOMAIN_BY_CODE, EXPERIENCE_DOMAINS } from '../data/adaptive-domain-questions'
import { useAssessment } from '../context/AssessmentContext'
import {
  calculateBaseEvidence,
  createDomainAssessmentState,
  finalizeDomainState,
  findNextIncompleteDomain,
  getAdaptiveQuestions,
  getEvidenceLabel,
  getStableQuestionOptions,
  isBaseComplete,
  selectAdaptiveBranch,
} from '../utils/experienceAssessment'

const branchLabels = {
  LOW_EXPOSURE: 'Khám phá có hướng dẫn',
  REALITY_CHECK: 'Reality Check',
  DEEP_DIVE: 'Deep-dive',
}

const statusLabels = {
  SELECTED: 'Chờ xác nhận',
  BASE_IN_PROGRESS: 'Đang trả lời nền tảng',
  BASE_COMPLETED: 'Đã xong bằng chứng nền',
  ADAPTIVE_IN_PROGRESS: 'Đang xem sâu',
  COMPLETED: 'Đã hoàn thành',
}

function AssessmentExperiencePage() {
  const navigate = useNavigate()
  const { assessment, updateExperience } = useAssessment()
  const { experience } = assessment
  const activeDomain = experience.activeDomain
  const activeState = activeDomain ? experience.domainStates[activeDomain] : null
  const activeMeta = activeDomain ? DOMAIN_BY_CODE[activeDomain] : null
  const saveExperience = (patch) => updateExperience(patch)

  const selectDomain = (domain) => {
    if (experience.selectedDomains.includes(domain)) {
      saveExperience({ activeDomain: domain, noExperience: false })
      return
    }
    saveExperience({
      selectedDomains: [...experience.selectedDomains, domain],
      domainStates: { ...experience.domainStates, [domain]: createDomainAssessmentState(domain) },
      activeDomain: domain,
      noExperience: false,
    })
  }

  const removeDomain = (domain) => {
    const selectedDomains = experience.selectedDomains.filter((item) => item !== domain)
    const domainStates = { ...experience.domainStates }
    delete domainStates[domain]
    saveExperience({
      selectedDomains,
      domainStates,
      activeDomain: activeDomain === domain ? selectedDomains[0] ?? null : activeDomain,
    })
  }

  const updateActiveState = (patch) => {
    if (!activeDomain || !activeState) return
    saveExperience({
      domainStates: {
        ...experience.domainStates,
        [activeDomain]: { ...activeState, ...patch },
      },
    })
  }

  const answerBase = (key, optionId) => {
    const baseAnswers = { ...activeState.baseAnswers, [key]: optionId }
    if (!isBaseComplete(baseAnswers)) {
      updateActiveState({ status: 'BASE_IN_PROGRESS', baseAnswers })
      return
    }

    const baseEvidenceScore = calculateBaseEvidence(baseAnswers)
    const adaptiveBranch = selectAdaptiveBranch(baseEvidenceScore)
    const allowedIds = new Set(getAdaptiveQuestions(activeDomain, adaptiveBranch).map(({ id }) => id))
    updateActiveState({
      status: 'ADAPTIVE_IN_PROGRESS',
      baseAnswers,
      baseEvidenceScore,
      adaptiveBranch,
      adaptiveAnswers: activeState.adaptiveAnswers.filter(({ questionId }) => allowedIds.has(questionId)),
    })
  }

  const answerAdaptive = (questionId, optionId) => {
    const remaining = activeState.adaptiveAnswers.filter((answer) => answer.questionId !== questionId)
    const adaptiveAnswers = [...remaining, { questionId, optionId }]
    const hasAnsweredAll = adaptiveQuestions.every(({ id }) =>
      adaptiveAnswers.some((answer) => answer.questionId === id),
    )

    if (!hasAnsweredAll) {
      updateActiveState({ adaptiveAnswers })
      return
    }

    const completed = finalizeDomainState({ ...activeState, adaptiveAnswers })
    const domainStates = { ...experience.domainStates, [activeDomain]: completed }
    const nextDomain = findNextIncompleteDomain(experience.selectedDomains, domainStates, activeDomain)
    saveExperience({ domainStates, activeDomain: nextDomain ?? activeDomain })
  }

  const chooseNoExperience = () => saveExperience({
    selectedDomains: [],
    domainStates: {},
    activeDomain: null,
    noExperience: true,
  })

  const adaptiveQuestions = activeState
    ? getAdaptiveQuestions(activeDomain, activeState.adaptiveBranch)
    : []
  return (
    <AssessmentStepShell step={3} eyebrow="Hoạt động & trải nghiệm thực tế">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-space-lg px-margin py-space-xl md:px-margin-md lg:px-gutter-lg">
        <section className="rounded-3xl bg-gradient-to-br from-surface-container-low to-surface-container-high p-space-lg shadow-sm md:p-space-xl">
          <div className="max-w-3xl">
            <span className="font-label-sm text-label-sm font-bold uppercase tracking-widest text-primary">Khảo sát thích ứng đa tầng</span>
            <h1 className="mt-space-xs font-headline-lg text-headline-lg-mobile font-bold text-on-surface sm:text-headline-lg">Bạn đã thực sự thử những hoạt động nào?</h1>
            <p className="mt-space-sm font-body-lg text-body-lg leading-relaxed text-on-surface-variant">Chọn tất cả lĩnh vực bạn từng trực tiếp trải nghiệm. Mỗi lĩnh vực được lưu riêng và có các tình huống chuyên biệt theo độ mạnh bằng chứng hiện tại.</p>
          </div>
        </section>

        <section aria-label="Chọn lĩnh vực trải nghiệm" className="grid grid-cols-2 gap-space-sm md:grid-cols-4">
          {EXPERIENCE_DOMAINS.map((domain) => {
            const selected = experience.selectedDomains.includes(domain.code)
            return (
              <div key={domain.code} className={`relative min-h-32 rounded-2xl border transition-all ${selected ? 'border-primary bg-primary-fixed/45 shadow-md ring-1 ring-primary' : 'border-surface-container-high bg-surface-container-lowest hover:-translate-y-0.5 hover:shadow-md'}`}>
                <button type="button" aria-pressed={selected} onClick={() => selectDomain(domain.code)} className="flex h-full w-full flex-col items-start justify-between p-space-md text-left">
                  <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${selected ? 'bg-primary text-white' : 'bg-surface-container text-primary'}`}><span className="material-symbols-outlined">{domain.icon}</span></span>
                  <span className="pr-5 font-label-lg text-label-lg font-bold text-on-surface">{domain.title}</span>
                </button>
                {selected && (
                  <button type="button" aria-label={`Bỏ chọn ${domain.title}`} onClick={() => removeDomain(domain.code)} className="absolute right-3 top-3 text-primary">
                    <span className="material-symbols-outlined text-lg">cancel</span>
                  </button>
                )}
              </div>
            )
          })}
        </section>

        <button type="button" onClick={chooseNoExperience} className={`inline-flex items-center justify-center gap-space-xs self-start rounded-full border px-space-lg py-space-sm font-label-md text-label-md font-semibold transition-colors ${experience.noExperience ? 'border-primary bg-primary-fixed/40 text-primary' : 'border-outline-variant bg-white text-on-surface-variant hover:border-primary'}`}>
          <span className="material-symbols-outlined text-lg">{experience.noExperience ? 'check_circle' : 'radio_button_unchecked'}</span>
          Tôi chưa có nhiều cơ hội thử các hoạt động trên
        </button>

        {experience.selectedDomains.length > 0 && (
          <section aria-label="Tiến độ từng lĩnh vực" className="flex flex-col gap-space-xs rounded-2xl border border-surface-container-high bg-white p-space-md">
            {experience.selectedDomains.map((domain) => {
              const state = experience.domainStates[domain]
              const isActive = domain === activeDomain
              return (
                <button key={domain} type="button" onClick={() => saveExperience({ activeDomain: domain })} className={`flex items-center justify-between rounded-xl px-space-md py-space-sm text-left ${isActive ? 'bg-primary-fixed/40' : 'hover:bg-surface-container-low'}`}>
                  <span className="font-label-md text-label-md font-bold text-on-surface">{DOMAIN_BY_CODE[domain].title}</span>
                  <span className={`text-xs font-semibold ${state.status === 'COMPLETED' ? 'text-emerald-700' : isActive ? 'text-primary' : 'text-on-surface-variant'}`}>{statusLabels[state.status]}</span>
                </button>
              )
            })}
          </section>
        )}

        {activeState ? (
          <div className="grid grid-cols-1 items-start gap-space-lg lg:grid-cols-12">
            <section className="flex flex-col gap-space-lg rounded-2xl border border-surface-container-high bg-white p-space-lg shadow-sm md:p-space-xl lg:col-span-8">
              <div>
                <span className="font-label-sm text-label-sm font-bold uppercase tracking-wider text-primary">Chi tiết trải nghiệm</span>
                <h2 className="font-headline-md text-headline-md text-on-surface">{activeMeta.title}</h2>
              </div>

              {['SELECTED', 'BASE_IN_PROGRESS'].includes(activeState.status) && (
                <>
                  {BASE_EVIDENCE_QUESTIONS.map((item, index) => (
                    <QuestionField key={item.key} index={index} prompt={`${item.prompt} — ${activeMeta.title}`} options={item.options} selectedId={activeState.baseAnswers[item.key]} onSelect={(optionId) => answerBase(item.key, optionId)} />
                  ))}
                  <ArtifactField state={activeState} onChange={(artifactUrl) => updateActiveState({ artifactUrl, verificationStatus: artifactUrl.trim() ? 'ARTIFACT_PROVIDED_UNVERIFIED' : 'SELF_REPORTED' })} />
                  <p className="rounded-xl bg-primary-fixed/30 px-space-md py-space-sm text-sm text-on-surface-variant">Sau câu nền cuối cùng, UniView sẽ tự chọn nhánh và chuyển sang các tình huống chuyên biệt.</p>
                </>
              )}

              {activeState.status === 'BASE_COMPLETED' && (
                <div className="rounded-2xl bg-primary-fixed/35 p-space-lg">
                  <span className="material-symbols-outlined text-3xl text-primary">task_alt</span>
                  <h3 className="mt-space-xs font-headline-sm text-headline-sm font-bold text-on-surface">Đã ghi nhận trải nghiệm của bạn</h3>
                  <p className="mt-space-xs text-on-surface-variant">Bằng chứng hiện tại: <strong>{getEvidenceLabel(activeState.baseEvidenceScore)} — {activeState.baseEvidenceScore}/100</strong></p>
                  <p className="mt-space-sm text-on-surface-variant">Tiếp theo, UniView sẽ đưa ra một vài tình huống gần với bản chất thực tế của {activeMeta.title}.</p>
                  <button type="button" onClick={() => updateActiveState({ status: 'ADAPTIVE_IN_PROGRESS' })} className="mt-space-md rounded-full bg-primary-container px-space-lg py-space-sm font-bold text-on-primary">Tiếp tục {branchLabels[activeState.adaptiveBranch]}</button>
                </div>
              )}

              {activeState.status === 'ADAPTIVE_IN_PROGRESS' && (
                <>
                  <div className="rounded-xl bg-surface-container-low p-space-md text-sm text-on-surface-variant">Nhánh <strong className="text-on-surface">{branchLabels[activeState.adaptiveBranch]}</strong> được chọn từ điểm bằng chứng nền {activeState.baseEvidenceScore}/100. Không có đáp án đúng hoặc sai.</div>
                  {adaptiveQuestions.map((item, index) => (
                    <QuestionField key={item.id} index={index} prompt={item.prompt} helpText={item.helpText} options={getStableQuestionOptions(item, experience.attemptSeed)} selectedId={activeState.adaptiveAnswers.find(({ questionId }) => questionId === item.id)?.optionId} onSelect={(optionId) => answerAdaptive(item.id, optionId)} />
                  ))}
                  <ArtifactField state={activeState} onChange={(artifactUrl) => updateActiveState({ artifactUrl, verificationStatus: artifactUrl.trim() ? 'ARTIFACT_PROVIDED_UNVERIFIED' : 'SELF_REPORTED' })} />
                  <p className="rounded-xl bg-emerald-50 px-space-md py-space-sm text-sm text-emerald-900">Câu cuối cùng sẽ được tự lưu. UniView sẽ chuyển sang lĩnh vực chưa hoàn thành tiếp theo, hoặc sang Bước 4 khi bạn đã hoàn tất tất cả.</p>
                </>
              )}

              {activeState.status === 'COMPLETED' && (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-space-lg">
                  <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">{activeMeta.title}</h3>
                  <p className="mt-space-xs text-emerald-800">Đã hoàn thành 3/3 tầng</p>
                  <p className="mt-space-xs text-on-surface-variant">Độ mạnh bằng chứng: <strong>{activeState.finalEvidenceScore}/100</strong></p>
                  <p className="text-on-surface-variant">Nguồn: {activeState.verificationStatus === 'SELF_REPORTED' ? 'Người dùng tự khai' : 'Có minh chứng do người dùng cung cấp, chưa xác minh'}</p>
                  <button type="button" onClick={() => updateActiveState({ status: 'BASE_IN_PROGRESS' })} className="mt-space-md font-semibold text-primary underline underline-offset-4">Chỉnh sửa câu trả lời</button>
                </div>
              )}
            </section>
            <EvidencePanel state={activeState} />
          </div>
        ) : !experience.noExperience ? (
          <div className="rounded-2xl border border-dashed border-outline-variant bg-surface-container-low p-space-xl text-center">
            <span className="material-symbols-outlined text-4xl text-primary">touch_app</span>
            <p className="mt-space-xs font-body-md text-body-md text-on-surface-variant">Chọn một hoặc nhiều lĩnh vực phía trên để bắt đầu.</p>
          </div>
        ) : null}

        {experience.selectedDomains.length > 0 && experience.selectedDomains.some((domain) => experience.domainStates[domain]?.status !== 'COMPLETED') && <p className="rounded-xl bg-amber-50 px-space-md py-space-sm text-sm text-amber-900">Bạn vẫn còn lĩnh vực chưa hoàn tất. Bạn có thể tiếp tục trả lời, hoặc sang Bước 4 và quay lại chỉnh sửa sau.</p>}

        <div className="flex flex-col items-center justify-between gap-space-md pb-space-xl sm:flex-row">
          <button type="button" onClick={() => navigate('/assessment/preferences')} className="inline-flex w-full items-center justify-center gap-space-xs rounded-full bg-surface-container-low px-space-lg py-space-sm font-label-lg text-label-lg font-semibold text-on-surface hover:bg-surface-container sm:w-auto"><span className="material-symbols-outlined text-lg">arrow_back</span>Quay lại Bước 2</button>
          <button type="button" onClick={() => navigate('/assessment/quick-profile')} className="group inline-flex w-full items-center justify-center gap-space-sm rounded-full bg-primary-container px-space-xl py-space-md font-label-lg text-label-lg font-bold text-on-primary shadow-lg transition-all hover:bg-primary sm:w-auto">Tiếp tục Bước 4<span className="material-symbols-outlined text-xl">arrow_forward</span></button>
        </div>
      </div>
    </AssessmentStepShell>
  )
}

function QuestionField({ index, prompt, helpText, options, selectedId, onSelect }) {
  return (
    <fieldset className="flex flex-col gap-space-xs">
      <legend className="mb-space-xs font-label-md text-label-md font-bold text-on-surface">{index + 1}. {prompt}</legend>
      {helpText && <p className="text-sm text-on-surface-variant">{helpText}</p>}
      <div className="grid grid-cols-1 gap-space-sm sm:grid-cols-2">
        {options.map((option) => {
          const selected = selectedId === option.id
          return <button key={option.id} type="button" onClick={() => onSelect(option.id)} className={`flex items-center justify-between rounded-xl p-space-md text-left font-label-md text-label-md transition-colors ${selected ? 'bg-primary-container font-semibold text-on-primary shadow-sm' : 'bg-surface-container-low text-on-surface hover:bg-surface-container'}`}><span>{option.label}</span><span className="material-symbols-outlined text-lg">{selected ? 'check_circle' : 'radio_button_unchecked'}</span></button>
        })}
      </div>
    </fieldset>
  )
}

function ArtifactField({ state, onChange }) {
  return (
    <label className="flex flex-col gap-space-xs">
      <span className="font-label-md text-label-md font-semibold text-on-surface">Thêm đường dẫn minh chứng hoặc mô tả sản phẩm <span className="font-normal text-on-surface-variant">(Không bắt buộc)</span></span>
      <div className="relative"><span className="material-symbols-outlined absolute left-3.5 top-3.5 text-xl text-on-surface-variant">link</span><input type="text" value={state.artifactUrl ?? ''} onChange={(event) => onChange(event.target.value)} placeholder="Link GitHub, website, sản phẩm hoặc mô tả ngắn..." className="w-full rounded-xl bg-surface-container-low py-space-sm pl-11 pr-space-md font-body-sm text-body-sm text-on-surface outline-none transition focus:bg-white focus:ring-2 focus:ring-primary" /></div>
      <span className="text-xs text-on-surface-variant">Minh chứng do bạn cung cấp được ghi nhận là chưa xác minh, không tự động chuyển thành “đã xác minh”.</span>
    </label>
  )
}

function EvidencePanel({ state }) {
  const score = state.finalEvidenceScore ?? state.baseEvidenceScore ?? calculateBaseEvidence(state.baseAnswers)
  return (
    <aside className="flex flex-col gap-space-md lg:col-span-4">
      <div className="rounded-2xl bg-surface-container-low p-space-lg">
        <div className="flex items-center justify-between"><span className="font-label-sm text-label-sm font-bold uppercase tracking-wider text-primary">Độ mạnh bằng chứng</span><span className="rounded-full bg-white px-2 py-0.5 text-xs font-bold text-primary shadow-sm">{score}/100</span></div>
        <div className="relative mx-auto my-space-md flex h-36 w-36 items-center justify-center rounded-full bg-white shadow-inner"><div className="absolute inset-3 rounded-full" style={{ background: `conic-gradient(#1d4ed8 ${score * 3.6}deg, #e1e8ff 0deg)` }} /><div className="relative flex h-24 w-24 flex-col items-center justify-center rounded-full bg-white"><strong className="font-headline-md text-headline-md text-on-surface">{score}%</strong><span className="text-xs text-on-surface-variant">Bằng chứng</span></div></div>
        <div className="rounded-xl bg-white p-space-md"><span className="font-label-md text-label-md font-bold text-on-surface">Cách hiểu chỉ số</span><p className="mt-1 font-body-sm text-body-sm leading-relaxed text-on-surface-variant">Chỉ số này phản ánh mức độ gần đây, tần suất, tính tự nguyện, vai trò và kết quả của trải nghiệm. Đây chưa phải xác minh năng lực chuyên môn.</p></div>
      </div>
    </aside>
  )
}

export default AssessmentExperiencePage
