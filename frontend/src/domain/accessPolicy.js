import { PLAN_IDS } from '../data/plans.js'

export const TASK_STATUS = {
  SELECTED: 'SELECTED',
  NOT_STARTED: 'NOT_STARTED',
  IN_PROGRESS: 'IN_PROGRESS',
  NEEDS_SUPPLEMENT: 'NEEDS_SUPPLEMENT',
  SUBMITTED: 'SUBMITTED',
  UNDER_REVIEW: 'UNDER_REVIEW',
  COMPLETED: 'COMPLETED',
  STOPPED: 'STOPPED',
  ARCHIVED: 'ARCHIVED',
}

export const SLOT_TASK_STATUSES = new Set([
  TASK_STATUS.SELECTED,
  TASK_STATUS.NOT_STARTED,
  TASK_STATUS.IN_PROGRESS,
  TASK_STATUS.NEEDS_SUPPLEMENT,
  TASK_STATUS.SUBMITTED,
  TASK_STATUS.UNDER_REVIEW,
])

export const PLAN_POLICY = {
  [PLAN_IDS.MONTHLY]: {
    openTaskLimit: 3,
    lifetimeStartedTaskLimit: 3,
    recommendedSelection: 3,
    unlimitedCompletedTasks: false,
  },
  [PLAN_IDS.ANNUAL]: {
    openTaskLimit: 5,
    lifetimeStartedTaskLimit: null,
    recommendedSelection: 3,
    unlimitedCompletedTasks: true,
  },
  [PLAN_IDS.ADMISSION_PASS]: {
    openTaskLimit: 4,
    lifetimeStartedTaskLimit: null,
    recommendedSelection: 1,
    unlimitedCompletedTasks: true,
  },
}

export function getCapabilities(activePlans = []) {
  const hasMonthly = activePlans.includes(PLAN_IDS.MONTHLY)
  const hasAnnual = activePlans.includes(PLAN_IDS.ANNUAL)
  const hasAdmissionPass = activePlans.includes(PLAN_IDS.ADMISSION_PASS)
  const subscriptionPlan = hasAnnual ? PLAN_IDS.ANNUAL : hasMonthly ? PLAN_IDS.MONTHLY : null

  return {
    subscriptionPlan,
    hasPersonalWorkspace: Boolean(subscriptionPlan || hasAdmissionPass),
    hasAnnualRoadmap: hasAnnual,
    hasAdmissionPass: hasAdmissionPass || hasAnnual,
    hasAdmissionMode: hasAdmissionPass || hasAnnual,
    canUseDecisionBoard: hasAdmissionPass || hasAnnual,
    taskPolicy: PLAN_POLICY[subscriptionPlan ?? (hasAdmissionPass ? PLAN_IDS.ADMISSION_PASS : PLAN_IDS.MONTHLY)],
  }
}

export const countOpenTasks = (taskRecords = {}) => Object.values(taskRecords)
  .filter(({ status }) => SLOT_TASK_STATUSES.has(status)).length

export const countStartedTasks = (taskRecords = {}) => Object.values(taskRecords)
  .filter(({ startedAt }) => Boolean(startedAt)).length

export function canOpenTask(taskRecords, policy) {
  const openTaskCount = countOpenTasks(taskRecords)
  const startedTaskCount = countStartedTasks(taskRecords)
  const hasOpenSlot = openTaskCount < policy.openTaskLimit
  const withinLifetimeLimit = policy.lifetimeStartedTaskLimit == null
    || startedTaskCount < policy.lifetimeStartedTaskLimit

  return {
    allowed: hasOpenSlot && withinLifetimeLimit,
    openTaskCount,
    availableSlots: Math.max(0, policy.openTaskLimit - openTaskCount),
    reason: !hasOpenSlot
      ? `Bạn đang có ${policy.openTaskLimit} task chưa kết thúc. Hãy hoàn thành hoặc dừng một task để mở task mới.`
      : !withinLifetimeLimit
        ? 'Bạn đã sử dụng đủ 3 task của Gói Tháng. Dữ liệu cũ vẫn được giữ để xem lại.'
        : null,
  }
}

export function canStartTask(taskRecords, policy, taskId) {
  const record = taskRecords?.[taskId]
  const quota = canOpenTask(taskRecords, policy)

  if (!record) {
    return { ...quota, allowed: false, reason: 'Task chưa được thêm vào Roadmap.' }
  }

  if (record.status === TASK_STATUS.COMPLETED || record.status === TASK_STATUS.ARCHIVED) {
    return { ...quota, allowed: false, reason: 'Task này đã hoàn thành và chỉ có thể xem lại.' }
  }

  const withinLifetimeLimit = record.startedAt
    || policy.lifetimeStartedTaskLimit == null
    || countStartedTasks(taskRecords) < policy.lifetimeStartedTaskLimit

  if (!withinLifetimeLimit) {
    return {
      ...quota,
      allowed: false,
      reason: 'Bạn đã sử dụng đủ 3 task của Gói Tháng. Dữ liệu cũ vẫn được giữ để xem lại.',
    }
  }

  // SELECTED/NOT_STARTED đã được tính là một slot mở. Chuyển task đó sang
  // IN_PROGRESS không tạo thêm slot nên vẫn phải được phép khi đang đủ 5/5.
  if (SLOT_TASK_STATUSES.has(record.status)) {
    return { ...quota, allowed: true, reason: null }
  }

  return quota
}
