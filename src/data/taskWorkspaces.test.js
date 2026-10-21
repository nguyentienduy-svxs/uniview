import assert from 'node:assert/strict'
import test from 'node:test'

import {
  DEADLINE_APP_CHALLENGE,
  evaluateDeadlineAppDraft,
  evaluateScoreDebugDraft,
  evaluateSignupTestDraft,
  createScoreDebugDraft,
  SCORE_DEBUG_CHALLENGE,
  SIGNUP_TEST_CHALLENGE,
} from './taskWorkspaces.js'

test('starter code phát hiện sai công thức tính trung bình', () => {
  const answer = createScoreDebugDraft()
  const result = evaluateScoreDebugDraft(answer)

  assert.equal(result.formulaCorrect, false)
  assert.equal(result.passed, false)
})

test('bài mẫu SE-02 đạt đủ tiêu chí và chạy test case theo dữ liệu có cấu trúc', () => {
  const answer = structuredClone(SCORE_DEBUG_CHALLENGE.demoAnswer)
  const result = evaluateScoreDebugDraft(answer)

  assert.equal(result.passed, true)
  assert.equal(result.customAverage, 8)
  assert.equal(result.customLabel, 'Excellent')
})

test('evaluator chỉ phân tích biểu thức cho phép và không thực thi source', () => {
  const answer = {
    ...structuredClone(SCORE_DEBUG_CHALLENGE.demoAnswer),
    source: 'throw new Error("must not execute")',
  }
  const result = evaluateScoreDebugDraft(answer)

  assert.equal(result.formulaCorrect, false)
  assert.equal(result.passed, false)
})

test('bài mẫu SE-01 đạt đủ tiêu chí phân tích yêu cầu', () => {
  const result = evaluateDeadlineAppDraft(structuredClone(DEADLINE_APP_CHALLENGE.demoAnswer))
  assert.equal(result.passed, true)
})

test('bộ 11 test case SE-03 bao phủ yêu cầu và trường hợp biên', () => {
  const result = evaluateSignupTestDraft({ rows: structuredClone(SIGNUP_TEST_CHALLENGE.demoRows) })
  assert.equal(result.completedCount, 11)
  assert.equal(result.passed, true)
})
