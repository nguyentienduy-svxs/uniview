import assert from 'node:assert/strict'
import test from 'node:test'

import { canStartTask, getCapabilities, PLAN_POLICY, TASK_STATUS } from './accessPolicy.js'
import { PLAN_IDS } from '../data/plans.js'

const selectedRecord = (taskId) => ({ taskId, status: TASK_STATUS.SELECTED, startedAt: null })

test('annual plan includes admission tools', () => {
  const capabilities = getCapabilities([PLAN_IDS.ANNUAL])

  assert.equal(capabilities.hasAnnualRoadmap, true)
  assert.equal(capabilities.hasAdmissionPass, true)
  assert.equal(capabilities.hasAdmissionMode, true)
  assert.equal(capabilities.canUseDecisionBoard, true)
})

test('monthly plan does not include admission tools', () => {
  const capabilities = getCapabilities([PLAN_IDS.MONTHLY])

  assert.equal(capabilities.canUseDecisionBoard, false)
})

test('Gói Năm vẫn bắt đầu được task đã giữ slot khi đang đủ 5/5', () => {
  const records = Object.fromEntries(Array.from({ length: 5 }, (_, index) => {
    const taskId = `task-${index + 1}`
    return [taskId, selectedRecord(taskId)]
  }))

  const result = canStartTask(records, PLAN_POLICY[PLAN_IDS.ANNUAL], 'task-1')

  assert.equal(result.openTaskCount, 5)
  assert.equal(result.availableSlots, 0)
  assert.equal(result.allowed, true)
})

test('không bắt đầu được task chưa nằm trong Roadmap khi đã đủ slot', () => {
  const records = Object.fromEntries(Array.from({ length: 5 }, (_, index) => {
    const taskId = `task-${index + 1}`
    return [taskId, selectedRecord(taskId)]
  }))

  const result = canStartTask(records, PLAN_POLICY[PLAN_IDS.ANNUAL], 'task-6')

  assert.equal(result.allowed, false)
  assert.match(result.reason, /chưa được thêm vào Roadmap/)
})
