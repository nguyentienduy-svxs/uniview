import assert from 'node:assert/strict'
import test from 'node:test'

import {
  createPitchDemoSession,
  getUnifiedStudentProfile,
  isPitchDemoAccount,
  PITCH_DEMO_EMAIL,
} from './pitchDemo.js'
import { PLAN_IDS } from './plans.js'

test('pitching workspace chỉ được áp dụng cho đúng email API', () => {
  assert.equal(isPitchDemoAccount(PITCH_DEMO_EMAIL.toUpperCase()), true)
  assert.equal(isPitchDemoAccount('student@example.com'), false)
})

test('tạo workspace Gói Năm 2027 với một hồ sơ chuẩn duy nhất', () => {
  const session = createPitchDemoSession({ id: 7, email: PITCH_DEMO_EMAIL, fullName: 'Mẫn Huệ' })
  const profile = getUnifiedStudentProfile(session.user)

  assert.equal(session.mockWorkspace, true)
  assert.deepEqual(session.activePlans, [PLAN_IDS.ANNUAL])
  assert.equal(session.admissionSeason, '2027')
  assert.equal(profile.thptScore, '25.50')
  assert.equal(profile.thptScoreStatus, 'EXPECTED')
  assert.equal(profile.dgnlScore, '875')
  assert.equal(profile.ieltsScore, '6.5')
  assert.equal(profile.tuitionBudgetMaxMillion, 35)
  assert.deepEqual(profile.preferredRegions, ['TP.HCM & lân cận'])
})

test('selector dùng dữ liệu đã sửa và không tự chèn mock cho người dùng Real', () => {
  const demo = createPitchDemoSession({ id: 7, email: PITCH_DEMO_EMAIL })
  demo.user.academicProfile.thptScore.value = '26.25'
  demo.user.tuitionBudgetMaxMillion = 45
  assert.equal(getUnifiedStudentProfile(demo.user).thptScore, '26.25')
  assert.equal(getUnifiedStudentProfile(demo.user).tuitionBudgetMaxMillion, 45)

  const realProfile = getUnifiedStudentProfile({ id: 8, email: 'real@example.com' })
  assert.equal(realProfile.thptScore, '')
  assert.equal(realProfile.dgnlScore, '')
  assert.equal(realProfile.tuitionBudgetMaxMillion, 0)
})
