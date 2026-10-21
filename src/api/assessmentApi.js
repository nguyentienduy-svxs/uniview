const ASSESSMENT_API_URL =
  import.meta.env.VITE_ASSESSMENT_API_URL ??
  'http://localhost:8081/api/v1'

async function assessmentRequest(endpoint, options = {}) {
  const response = await fetch(
    `${ASSESSMENT_API_URL}${endpoint}`,
    {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    },
  )

  const body = await response
    .json()
    .catch(() => null)

  if (!response.ok) {
    const error = new Error(
      body?.message ??
        `Assessment API error: ${response.status}`,
    )
    error.status = response.status
    error.details = body
    throw error
  }

  return body
}

export const assessmentApi = {
  getDefinition: () =>
    assessmentRequest('/assessments/definition'),
  getRiasec: () => assessmentRequest('/assessments/riasec'),
  getMbti: () => assessmentRequest('/assessments/mbti'),
  getExperienceDomains: () =>
    assessmentRequest('/assessments/experience-domains'),
  getExperienceDomain: (domain) =>
    assessmentRequest(
      `/assessments/experience-domains/${encodeURIComponent(domain)}`,
    ),
  evaluateExperienceBase: (domain, baseAnswers) =>
    assessmentRequest(`/assessments/experience-domains/${encodeURIComponent(domain)}/evaluate-base`, {
      method: 'POST',
      body: JSON.stringify({ baseAnswers }),
    }),
  evaluateExperienceAdaptive: (domain, payload) =>
    assessmentRequest(`/assessments/experience-domains/${encodeURIComponent(domain)}/evaluate-adaptive`, {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  evaluate: (payload) =>
    assessmentRequest('/assessments/evaluate', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  getDemoPersonas: () =>
    assessmentRequest('/assessments/demo-personas'),
  evaluateDemo: (personaId) =>
    assessmentRequest(
      `/assessments/evaluate-demo/${encodeURIComponent(personaId)}`,
      { method: 'POST' },
    ),
}

export const isAssessmentApiEnabled =
  import.meta.env.VITE_ASSESSMENT_API_ENABLED ===
  'true'
