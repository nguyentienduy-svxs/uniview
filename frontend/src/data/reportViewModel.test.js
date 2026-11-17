import assert from 'node:assert/strict'
import test from 'node:test'

import { buildAssessmentReportViewModel } from './reportViewModel.js'

const assessment = {
  riasecAnswers: {},
  experience: {},
  profile: { regions: [], strengths: [] },
  report: null,
}

test('report luôn có đúng 3 nhóm và mỗi nhóm 6 ngành không trùng ID', () => {
  const report = buildAssessmentReportViewModel({ user: { id: 'demo' }, assessment, isMockMode: true })
  assert.equal(report.groups.length, 3)
  report.groups.forEach((group) => assert.equal(group.majors.length, 6))
  assert.equal(new Set(report.majors.map((major) => major.id)).size, 18)
})

test('mỗi ngành dùng ID ổn định cho shortlist và roadmap', () => {
  const report = buildAssessmentReportViewModel({ user: { id: 'demo' }, assessment, isMockMode: true })
  report.majors.forEach((major) => {
    assert.equal(major.roadmap.majorId, major.id)
    assert.equal(major.roadmap.assessmentResultId, report.assessmentResultId)
  })
})

test('Real Mode không tự chèn nhóm ngành khi API chưa có assessment result', () => {
  const report = buildAssessmentReportViewModel({ user: { id: 'real-user' }, assessment, isMockMode: false })
  assert.deepEqual(report.groups, [])
  assert.deepEqual(report.majors, [])
})
