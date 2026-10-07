import test from 'node:test'
import assert from 'node:assert/strict'

import { buildAssessmentPayload } from './assessmentPayload.js'

test('payload giữ trạng thái chính thức hoặc dự kiến của ba loại điểm', () => {
  const assessment = {
    riasecAnswers: {},
    personalityAnswers: {},
    experience: { selectedDomains: [], domainStates: {}, noExperience: true },
    profile: {
      admissionYear: '2027', regions: [], tuition: '25-45', scholarship: false, strengths: [], priorities: [], certificates: [],
      gpa: '8.5', gpaStatus: 'OFFICIAL',
      thptScore: '25', thptScoreStatus: 'EXPECTED',
      dgnlScore: '900', dgnlScoreStatus: 'OFFICIAL',
    },
  }
  const profile = buildAssessmentPayload(assessment).profile
  assert.equal(profile.gpaStatus, 'OFFICIAL')
  assert.equal(profile.thptScoreStatus, 'EXPECTED')
  assert.equal(profile.dgnlScoreStatus, 'OFFICIAL')
})
