import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import AssessmentStepShell from '../components/assessment/AssessmentStepShell'
import { useAssessment } from '../context/AssessmentContext'
import { useAuth } from '../context/AuthContext'
import {
  CERTIFICATE_OPTIONS,
  CERTIFICATE_STATUS,
  certificateLabel,
  normalizeCertificates,
} from '../utils/certificates'

const tuitionOptions = [
  ['under-25', 'Dưới 25 triệu / năm'],
  ['25-45', '25 – 45 triệu / năm'],
  ['45-70', '45 – 70 triệu / năm'],
  ['over-70', 'Trên 70 triệu / năm'],
  ['undecided', 'Chưa xác định'],
]

const priorityOptions = [
  'Đội ngũ giảng viên chất lượng',
  'Hoạt động ngoại khóa & CLB',
  'Vị trí địa lý thuận tiện',
  'Học bổng & hỗ trợ tài chính',
  'Chương trình liên kết quốc tế',
  'Uy tín đào tạo',
]

function QuickProfilePage() {
  const navigate = useNavigate()
  const {
    assessment,
    updateProfile,
    submitAssessment,
    submitState,
  } = useAssessment()
  const {
    user,
    hasEntitlement,
    saveReportToHistory,
  } = useAuth()
  const [submitError, setSubmitError] = useState('')

  const { profile } = assessment
  const certificates = normalizeCertificates(profile.certificates, 'PROFILE')
  const [certificateDraft, setCertificateDraft] = useState({
    type: 'IELTS_ACADEMIC',
    customName: '',
    score: '',
    status: CERTIFICATE_STATUS.EXPECTED,
  })

  const updateField = (field, value) => {
    updateProfile({
      [field]: value,
    })
  }

  const removeTag = (field, value) => {
    updateField(
      field,
      profile[field].filter(
        (item) => item !== value,
      ),
    )
  }

  const addUnique = (field, value) => {
    if (
      !value ||
      profile[field].includes(value)
    ) {
      return
    }

    updateField(field, [
      ...profile[field],
      value,
    ])
  }

  const addCertificate = () => {
    const option = CERTIFICATE_OPTIONS.find(({ id }) => id === certificateDraft.type)
    const name = certificateDraft.type === 'OTHER'
      ? certificateDraft.customName.trim()
      : option?.label
    const score = certificateDraft.score.trim()
    if (!name || !score) return

    updateField('certificates', [
      ...certificates,
      {
        id: createCertificateId(certificateDraft.type, score, certificates),
        type: certificateDraft.type,
        name,
        score,
        status: certificateDraft.status,
        source: 'ASSESSMENT',
      },
    ])
    setCertificateDraft((current) => ({
      ...current,
      customName: '',
      score: '',
    }))
  }

  const updateCertificate = (certificateId, patch) => {
    updateField(
      'certificates',
      certificates.map((certificate) =>
        certificate.id === certificateId
          ? { ...certificate, ...patch, source: 'ASSESSMENT' }
          : certificate,
      ),
    )
  }

  const removeCertificate = (certificateId) => {
    updateField(
      'certificates',
      certificates.filter(({ id }) => id !== certificateId),
    )
  }

  return (
    <AssessmentStepShell
      step={4}
      eyebrow="Hồ sơ & điều kiện thực tế"
    >
      <div className="mx-auto flex max-w-[980px] flex-col gap-space-md px-margin py-space-lg md:px-margin-md">
        <section className="flex flex-col justify-between gap-space-md rounded-2xl border border-surface-container-high bg-surface-container-lowest p-space-md shadow-sm md:flex-row md:items-center">
          <div>
            <div className="flex flex-wrap items-center gap-space-xs">
              <span className="rounded-full bg-surface-container-high px-space-sm py-0.5 font-label-sm text-[11px] font-bold uppercase tracking-wide text-primary-container">
                Bước 4 · Rà soát hồ sơ thực tế
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-primary-fixed/30 px-space-sm py-0.5 text-[11px] font-semibold text-primary-container">
                <span className="material-symbols-outlined text-xs">
                  check
                </span>
                Đã lấy dữ liệu từ hồ sơ
              </span>
            </div>
            <h1 className="mt-1 font-headline-md text-headline-md font-extrabold tracking-tight text-on-surface">
              Điều kiện & mục tiêu thực tế
            </h1>
            <p className="max-w-xl font-body-sm text-body-sm text-on-surface-variant">
              Kiểm tra và chỉnh lại các thông tin sẽ
              được dùng để đối chiếu ngành, trường và
              phương thức tuyển sinh.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-space-sm rounded-xl border border-surface-container-high bg-surface-container-low/70 p-space-sm">
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-white">
              <img
                src="/stitch-assets/uniview-mascot-rating-guide.jpg"
                alt="Linh vật UniView"
                className="absolute left-0 top-0 w-[400%] max-w-none"
              />
            </div>
            <div className="max-w-[210px] rounded-lg border border-surface-container-high bg-white px-space-sm py-space-xs text-xs font-medium leading-tight text-on-surface shadow-sm">
              Kiểm tra nhanh rồi mình xem kết quả
              nhé!
            </div>
          </div>
        </section>

        <form
          className="flex flex-col gap-space-md"
          onSubmit={async (event) => {
            event.preventDefault()
            setSubmitError('')
            try {
              const report = await submitAssessment({ userId: user?.id })
              if (
                hasEntitlement('DIRECTION_SNAPSHOT') ||
                hasEntitlement('ADMISSION_PASS')
              ) {
                saveReportToHistory(report)
              }
              navigate('/assessment/result')
            } catch (error) {
              setSubmitError(error.message)
            }
          }}
        >
          <div className="grid grid-cols-1 gap-space-md md:grid-cols-2">
            <FormCard
              title="1. Năm dự kiến nhập học"
              fromProfile
            >
              <select
                value={profile.admissionYear}
                onChange={(event) =>
                  updateField(
                    'admissionYear',
                    event.target.value,
                  )
                }
                className="w-full appearance-none rounded-lg border border-outline-variant/60 bg-surface-container-low/50 px-space-md py-space-xs text-body-sm font-semibold text-on-surface outline-none transition-colors focus:border-primary-container"
              >
                <option value="2027">
                  2027
                </option>
                <option value="2028">
                  2028
                </option>
                <option value="other">
                  Chưa xác định
                </option>
              </select>
            </FormCard>

            <FormCard
              title="2. Khu vực bạn có thể học"
              fromProfile
            >
              <div className="flex flex-wrap items-center gap-space-xs">
                {profile.regions.map((region) => (
                  <Tag
                    key={region}
                    label={region}
                    onRemove={() =>
                      removeTag(
                        'regions',
                        region,
                      )
                    }
                  />
                ))}
                <select
                  value=""
                  onChange={(event) => {
                    addUnique(
                      'regions',
                      event.target.value,
                    )
                  }}
                  className="min-w-[150px] flex-1 rounded-lg border border-dashed border-primary-container/50 bg-surface-container-low/40 px-space-sm py-1.5 text-xs font-semibold text-primary-container outline-none"
                >
                  <option value="">
                    + Thêm khu vực...
                  </option>
                  <option value="Hà Nội & miền Bắc">
                    Hà Nội & miền Bắc
                  </option>
                  <option value="Đà Nẵng & miền Trung">
                    Đà Nẵng & miền Trung
                  </option>
                  <option value="Không giới hạn">
                    Không giới hạn
                  </option>
                </select>
              </div>
            </FormCard>
          </div>

          <FormCard
            title="3. Học phí dự kiến tối đa mỗi năm"
            fromProfile
          >
            <div className="grid grid-cols-1 items-center gap-space-md sm:grid-cols-2">
              <select
                value={profile.tuition}
                onChange={(event) =>
                  updateField(
                    'tuition',
                    event.target.value,
                  )
                }
                className="w-full appearance-none rounded-lg border border-primary-container/50 bg-surface-container-low/50 px-space-md py-space-xs text-body-sm font-bold text-primary-container outline-none transition-colors focus:border-primary-container"
              >
                {tuitionOptions.map(
                  ([value, label]) => (
                    <option
                      key={value}
                      value={value}
                    >
                      {label}
                    </option>
                  ),
                )}
              </select>

              <label className="flex cursor-pointer items-center gap-space-xs text-xs font-medium text-on-surface">
                <input
                  type="checkbox"
                  checked={profile.scholarship}
                  onChange={(event) =>
                    updateField(
                      'scholarship',
                      event.target.checked,
                    )
                  }
                  className="h-4 w-4 accent-primary-container"
                />
                Có thể cân nhắc học bổng / hỗ trợ
                tài chính
              </label>
            </div>
          </FormCard>

          <FormCard
            title="4. Học tập & Điểm số"
            fromProfile
            helper="Không bắt buộc có đủ tất cả"
          >
            <div className="flex flex-col gap-space-xs">
              <span className="text-xs font-semibold text-on-surface-variant">
                Môn bạn tự tin / Điểm mạnh
              </span>
              <div className="flex flex-wrap items-center gap-space-xs">
                {profile.strengths.map(
                  (strength) => (
                    <Tag
                      key={strength}
                      label={strength}
                      onRemove={() =>
                        removeTag(
                          'strengths',
                          strength,
                        )
                      }
                    />
                  ),
                )}
                <select
                  value=""
                  onChange={(event) =>
                    addUnique(
                      'strengths',
                      event.target.value,
                    )
                  }
                  className="rounded-md border border-dashed border-primary-container/50 bg-white px-space-sm py-1 text-xs font-semibold text-primary-container"
                >
                  <option value="">
                    + Thêm môn
                  </option>
                  <option value="Ngữ văn">
                    Ngữ văn
                  </option>
                  <option value="Vật lý">
                    Vật lý
                  </option>
                  <option value="Hóa học">
                    Hóa học
                  </option>
                  <option value="Sinh học">
                    Sinh học
                  </option>
                </select>
              </div>
            </div>

            <div className="mt-space-sm grid grid-cols-1 gap-space-sm sm:grid-cols-3">
              <ScoreInput
                label="Học bạ THPT (GPA)"
                value={profile.gpa}
                status={profile.gpaStatus}
                suffix="/10"
                onChange={(value) =>
                  updateField('gpa', value)
                }
                onStatusChange={(value) => updateField('gpaStatus', value)}
              />
              <ScoreInput
                label="Tổ hợp THPT"
                value={profile.thptScore}
                status={profile.thptScoreStatus}
                suffix="/30"
                onChange={(value) =>
                  updateField(
                    'thptScore',
                    value,
                  )
                }
                onStatusChange={(value) => updateField('thptScoreStatus', value)}
              />
              <ScoreInput
                label="ĐGNL ĐHQG-HCM"
                value={profile.dgnlScore}
                status={profile.dgnlScoreStatus}
                suffix="/1200"
                onChange={(value) =>
                  updateField(
                    'dgnlScore',
                    value,
                  )
                }
                onStatusChange={(value) => updateField('dgnlScoreStatus', value)}
              />
            </div>

            <div className="mt-space-xs flex items-start gap-1.5 rounded-lg bg-primary-fixed/25 px-space-xs py-1.5 text-[11px] leading-relaxed text-on-surface-variant">
              <span className="material-symbols-outlined text-sm text-primary-container">info</span>
              <span><strong className="text-on-surface">Điểm chính thức có độ tin cậy cao hơn</strong> trong đánh giá học tập. Điểm dự kiến vẫn giúp định hướng nhưng không được xem là kết quả đã xác nhận.</span>
            </div>

            <div className="mt-space-sm rounded-xl border border-surface-container-high bg-surface-container-low/40 p-space-sm">
              <div className="flex flex-wrap items-center justify-between gap-space-xs">
                <span className="text-xs font-bold text-on-surface-variant">
                  Chứng chỉ quốc tế & ngoại ngữ
                </span>
                <span className="text-[11px] text-on-surface-variant">Có thể thêm điểm chưa cập nhật trong hồ sơ</span>
              </div>

              {certificates.length > 0 && (
                <div className="mt-space-xs flex flex-col gap-space-xs">
                  {certificates.map((certificate) => (
                    <div key={certificate.id} className="flex flex-col gap-space-xs rounded-lg border border-primary-container/15 bg-white p-space-xs sm:flex-row sm:items-center">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="text-xs font-bold text-on-surface">{certificateLabel(certificate)}</span>
                          {certificate.source === 'PROFILE' && <span className="rounded bg-primary-fixed/30 px-1.5 py-0.5 text-[10px] font-semibold text-primary-container">Từ hồ sơ</span>}
                        </div>
                      </div>
                      <select
                        aria-label={`Trạng thái điểm ${certificateLabel(certificate)}`}
                        value={certificate.status}
                        onChange={(event) => updateCertificate(certificate.id, { status: event.target.value })}
                        className={`rounded-md border px-space-xs py-1 text-[11px] font-bold outline-none ${certificate.status === CERTIFICATE_STATUS.OFFICIAL ? 'border-emerald-200 bg-emerald-50 text-emerald-800' : 'border-amber-200 bg-amber-50 text-amber-800'}`}
                      >
                        <option value={CERTIFICATE_STATUS.OFFICIAL}>Điểm chính thức</option>
                        <option value={CERTIFICATE_STATUS.EXPECTED}>Điểm dự kiến</option>
                      </select>
                      <button type="button" onClick={() => removeCertificate(certificate.id)} aria-label={`Bỏ ${certificateLabel(certificate)}`} className="self-end text-outline hover:text-error sm:self-auto">
                        <span className="material-symbols-outlined text-lg">close</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-space-sm grid grid-cols-1 gap-space-xs rounded-lg border border-dashed border-primary-container/40 bg-white p-space-xs sm:grid-cols-2">
                <select
                  value={certificateDraft.type}
                  onChange={(event) => setCertificateDraft((current) => ({ ...current, type: event.target.value }))}
                  className="rounded-md border border-outline-variant/60 bg-white px-space-xs py-1.5 text-xs font-semibold text-on-surface outline-none focus:border-primary-container"
                >
                  {CERTIFICATE_OPTIONS.map((option) => <option key={option.id} value={option.id}>{option.label}</option>)}
                </select>
                {certificateDraft.type === 'OTHER' && (
                  <input
                    type="text"
                    value={certificateDraft.customName}
                    onChange={(event) => setCertificateDraft((current) => ({ ...current, customName: event.target.value }))}
                    placeholder="Tên chứng chỉ"
                    className="rounded-md border border-outline-variant/60 px-space-xs py-1.5 text-xs outline-none focus:border-primary-container"
                  />
                )}
                <input
                  type="text"
                  value={certificateDraft.score}
                  onChange={(event) => setCertificateDraft((current) => ({ ...current, score: event.target.value }))}
                  placeholder={CERTIFICATE_OPTIONS.find(({ id }) => id === certificateDraft.type)?.placeholder}
                  className="rounded-md border border-outline-variant/60 px-space-xs py-1.5 text-xs outline-none focus:border-primary-container"
                />
                <select
                  value={certificateDraft.status}
                  onChange={(event) => setCertificateDraft((current) => ({ ...current, status: event.target.value }))}
                  className="rounded-md border border-outline-variant/60 bg-white px-space-xs py-1.5 text-xs font-semibold text-on-surface outline-none focus:border-primary-container"
                >
                  <option value={CERTIFICATE_STATUS.EXPECTED}>Điểm dự kiến</option>
                  <option value={CERTIFICATE_STATUS.OFFICIAL}>Điểm chính thức</option>
                </select>
                <button
                  type="button"
                  onClick={addCertificate}
                  disabled={!certificateDraft.score.trim() || (certificateDraft.type === 'OTHER' && !certificateDraft.customName.trim())}
                  className="rounded-md bg-primary-container px-space-sm py-1.5 text-xs font-bold text-on-primary disabled:cursor-not-allowed disabled:opacity-40"
                >
                  + Thêm chứng chỉ
                </button>
              </div>

              <div className="mt-space-xs flex items-start gap-1.5 rounded-lg bg-primary-fixed/25 px-space-xs py-1.5 text-[11px] leading-relaxed text-on-surface-variant">
                <span className="material-symbols-outlined text-sm text-primary-container">info</span>
                <span><strong className="text-on-surface">Điểm chính thức có độ tin cậy cao hơn</strong> trong phần đánh giá học tập. Điểm dự kiến vẫn được dùng để định hướng nhưng không được xem là kết quả đã xác nhận.</span>
              </div>
            </div>
          </FormCard>

          <FormCard
            title="5. Các yếu tố quan trọng nhất khi chọn trường"
            fromProfile
            helper={
              'Đã chọn ' +
              profile.priorities.length +
              ' tiêu chí'
            }
          >
            <p className="mb-space-xs text-xs text-on-surface-variant">
              UniView kết hợp các tiêu chí này để xếp
              hạng độ phù hợp của từng lựa chọn.
            </p>

            <div className="flex flex-wrap items-center gap-space-xs">
              {profile.priorities.map(
                (priority) => (
                  <Tag
                    key={priority}
                    label={priority}
                    onRemove={() =>
                      removeTag(
                        'priorities',
                        priority,
                      )
                    }
                  />
                ),
              )}

              <select
                value=""
                onChange={(event) =>
                  addUnique(
                    'priorities',
                    event.target.value,
                  )
                }
                className="min-w-[210px] rounded-lg border border-dashed border-primary-container/50 bg-surface-container-low/40 px-space-sm py-1.5 text-xs font-semibold text-primary-container"
              >
                <option value="">
                  + Thêm yếu tố quan tâm...
                </option>
                {priorityOptions.map(
                  (option) => (
                    <option
                      key={option}
                      value={option}
                    >
                      {option}
                    </option>
                  ),
                )}
              </select>
            </div>
          </FormCard>

          <label className="flex cursor-pointer items-center justify-between gap-space-sm rounded-lg border border-surface-container-high bg-surface-container-low/60 p-space-sm">
            <span className="flex items-center gap-space-xs">
              <input
                type="checkbox"
                checked={profile.syncProfile}
                onChange={(event) =>
                  updateField(
                    'syncProfile',
                    event.target.checked,
                  )
                }
                className="h-4 w-4 accent-primary-container"
              />
              <span className="text-xs font-semibold text-on-surface">
                Cập nhật các thay đổi vào Hồ sơ cá
                nhân
              </span>
            </span>
            <span className="hidden text-[11px] text-on-surface-variant sm:inline">
              Tự động ghi nhớ cho các lần gợi ý sau
            </span>
          </label>

          <div className="flex items-center gap-space-xs rounded-xl border border-primary-container/20 bg-surface-container-high/60 px-space-md py-space-xs text-xs text-on-surface">
            <span className="material-symbols-outlined shrink-0 text-base text-primary-container">
              assignment
            </span>
            <span>
              <strong className="text-primary-container">
                Tóm tắt:
              </strong>{' '}
              Năm {profile.admissionYear} ·{' '}
              {profile.regions.join(', ') ||
                'Chưa chọn khu vực'}{' '}
              · GPA {profile.gpa || '—'} · ĐGNL{' '}
              {profile.dgnlScore || '—'} ·{' '}
              {profile.priorities.length} tiêu chí
              chọn trường
            </span>
          </div>

          {submitError && (
            <p className="rounded-xl border border-rose-200 bg-rose-50 p-space-sm text-sm font-semibold text-rose-700">
              {submitError}
            </p>
          )}

          <div className="sticky bottom-0 z-40 -mx-margin flex items-center justify-between gap-space-md border-t border-surface-container-high bg-surface-container-lowest/95 px-margin py-space-md shadow-[0_-4px_16px_rgba(0,0,0,0.06)] backdrop-blur-md md:-mx-margin-md md:px-margin-md">
            <button
              type="button"
              onClick={() =>
                navigate('/assessment/experience')
              }
              className="inline-flex items-center gap-space-xs rounded-full bg-surface-container-low px-space-md py-space-sm font-label-lg text-label-lg font-semibold text-on-surface hover:bg-surface-container"
            >
              <span className="material-symbols-outlined text-lg">
                arrow_back
              </span>
              <span className="hidden sm:inline">
                Quay lại Bước 3
              </span>
            </button>

            <span className="hidden items-center gap-space-xs font-label-md text-label-md text-on-surface-variant md:flex">
              <span className="material-symbols-outlined text-base text-primary-container">
                check
              </span>
              Đã tự động lưu
            </span>

            <button
              type="submit"
              disabled={submitState.loading}
              className="inline-flex items-center gap-space-xs rounded-full bg-primary-container px-space-xl py-space-sm font-label-lg text-label-lg font-semibold text-on-primary shadow-md transition-all hover:bg-primary hover:shadow-lg active:scale-95 disabled:cursor-wait disabled:opacity-70"
            >
              {submitState.loading ? 'Đang tạo báo cáo...' : 'Hoàn thành & Xem kết quả'}
              <span className="material-symbols-outlined text-lg">
                arrow_forward
              </span>
            </button>
          </div>
        </form>
      </div>
    </AssessmentStepShell>
  )
}

function FormCard({
  title,
  helper,
  fromProfile,
  children,
}) {
  return (
    <section className="flex flex-col gap-space-sm rounded-xl border border-surface-container-high bg-surface-container-lowest p-space-md shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-space-xs border-b border-surface-container pb-space-xs">
        <h2 className="flex items-center gap-1.5 font-label-md text-label-md font-bold text-on-surface">
          {title}
          {fromProfile && (
            <span className="rounded bg-primary-fixed/30 px-space-xs py-0.5 text-[11px] font-semibold text-primary-container">
              Từ hồ sơ
            </span>
          )}
        </h2>
        {helper && (
          <span className="text-xs text-outline">
            {helper}
          </span>
        )}
      </div>
      {children}
    </section>
  )
}

function Tag({ label, onRemove }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-lg border border-primary-container/20 bg-primary-fixed/20 px-space-sm py-1 text-xs font-semibold text-on-surface">
      <span className="material-symbols-outlined text-sm text-primary-container">
        check
      </span>
      {label}
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Bỏ ${label}`}
        className="ml-0.5 text-outline transition-colors hover:text-error"
      >
        <span className="material-symbols-outlined text-sm">
          close
        </span>
      </button>
    </span>
  )
}

function ScoreInput({
  label,
  value,
  status,
  suffix,
  onChange,
  onStatusChange,
}) {
  return (
    <label className="flex flex-col gap-1 rounded-lg border border-surface-container-high bg-surface-container-low/40 p-space-xs">
      <span className="flex items-center justify-between gap-1">
        <span className="text-[11px] font-bold text-on-surface-variant">{label}</span>
        <select
          aria-label={`Trạng thái ${label}`}
          value={status ?? 'EXPECTED'}
          onChange={(event) => onStatusChange(event.target.value)}
          className={`max-w-[105px] rounded border px-1 py-0.5 text-[10px] font-bold outline-none ${status === 'OFFICIAL' ? 'border-emerald-200 bg-emerald-50 text-emerald-800' : 'border-amber-200 bg-amber-50 text-amber-800'}`}
        >
          <option value="OFFICIAL">Chính thức</option>
          <option value="EXPECTED">Dự kiến</option>
        </select>
      </span>
      <span className="flex items-center gap-1">
        <input
          type="text"
          value={value}
          onChange={(event) =>
            onChange(event.target.value)
          }
          className="w-full rounded border border-outline-variant/60 bg-white px-space-xs py-0.5 text-base font-bold text-on-surface outline-none focus:border-primary-container"
        />
        <span className="shrink-0 text-xs font-medium text-outline">
          {suffix}
        </span>
      </span>
    </label>
  )
}

function createCertificateId(type, score, certificates) {
  const base = `assessment-${type.toLowerCase()}-${score.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
  let id = base
  let suffix = 2
  while (certificates.some((certificate) => certificate.id === id)) {
    id = `${base}-${suffix}`
    suffix += 1
  }
  return id
}

export default QuickProfilePage
