export const CERTIFICATE_OPTIONS = [
  { id: 'IELTS_ACADEMIC', label: 'IELTS Academic', placeholder: 'Ví dụ: 6.5' },
  { id: 'TOEFL_IBT', label: 'TOEFL iBT', placeholder: 'Ví dụ: 90' },
  { id: 'TOEIC_LR', label: 'TOEIC Listening & Reading', placeholder: 'Ví dụ: 850' },
  { id: 'SAT', label: 'SAT', placeholder: 'Ví dụ: 1350' },
  { id: 'ACT', label: 'ACT', placeholder: 'Ví dụ: 28' },
  { id: 'CAMBRIDGE', label: 'Cambridge English', placeholder: 'Ví dụ: B2 First 170' },
  { id: 'JLPT', label: 'JLPT', placeholder: 'Ví dụ: N3' },
  { id: 'HSK', label: 'HSK', placeholder: 'Ví dụ: HSK 4' },
  { id: 'TOPIK', label: 'TOPIK', placeholder: 'Ví dụ: Cấp 3' },
  { id: 'OTHER', label: 'Chứng chỉ khác', placeholder: 'Nhập điểm hoặc cấp độ' },
]

export const CERTIFICATE_STATUS = {
  OFFICIAL: 'OFFICIAL',
  EXPECTED: 'EXPECTED',
}

export function normalizeCertificates(certificates = [], defaultSource = 'ASSESSMENT') {
  if (!Array.isArray(certificates)) return []

  return certificates.flatMap((certificate, index) => {
    if (typeof certificate === 'string') {
      const expected = certificate.toLowerCase().includes('dự kiến')
      const cleaned = certificate.replace(/\s*dự kiến\s*/i, ' ').trim()
      const scoreMatch = cleaned.match(/([^\s]+)$/)
      const score = scoreMatch?.[1] ?? ''
      const name = score ? cleaned.slice(0, -score.length).trim() : cleaned
      return [{
        id: `legacy-${index}-${slugify(cleaned)}`,
        type: inferCertificateType(name),
        name,
        score,
        status: expected ? CERTIFICATE_STATUS.EXPECTED : CERTIFICATE_STATUS.OFFICIAL,
        source: defaultSource,
      }]
    }

    if (!certificate || typeof certificate !== 'object') return []
    const status = certificate.status === CERTIFICATE_STATUS.EXPECTED
      ? CERTIFICATE_STATUS.EXPECTED
      : CERTIFICATE_STATUS.OFFICIAL
    return [{
      id: certificate.id ?? `certificate-${index}-${slugify(`${certificate.name}-${certificate.score}`)}`,
      type: certificate.type ?? inferCertificateType(certificate.name),
      name: certificate.name ?? certificate.type ?? 'Chứng chỉ khác',
      score: String(certificate.score ?? ''),
      status,
      source: certificate.source ?? defaultSource,
    }]
  })
}

export function certificateLabel(certificate) {
  return [certificate.name, certificate.score].filter(Boolean).join(' ')
}

export function certificateEvidenceWeight(certificates = []) {
  const normalized = normalizeCertificates(certificates)
  if (normalized.some(({ status }) => status === CERTIFICATE_STATUS.OFFICIAL)) return 90
  if (normalized.some(({ status }) => status === CERTIFICATE_STATUS.EXPECTED)) return 60
  return null
}

function inferCertificateType(name = '') {
  const normalized = name.toUpperCase()
  return CERTIFICATE_OPTIONS.find(({ id, label }) => normalized.includes(id.split('_')[0]) || normalized.includes(label.toUpperCase()))?.id ?? 'OTHER'
}

function slugify(value) {
  return String(value).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'item'
}
