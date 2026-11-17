import { findDemoTask } from '../data/annualDemo'
import { TASK_STATUS } from './accessPolicy'

export const DIRECTION_STATUS = {
  EXPLORING: 'EXPLORING',
  PROMISING: 'PROMISING',
  NEEDS_MORE_EVIDENCE: 'NEEDS_MORE_EVIDENCE',
  DEPRIORITIZED: 'DEPRIORITIZED',
  PRIORITY_DIRECTION: 'PRIORITY_DIRECTION',
}

export function getDirectionInsight(majorId, taskRecords = {}) {
  const records = Object.values(taskRecords).filter((record) => findDemoTask(record.taskId)?.majorId === majorId)
  const completed = records.filter(({ status }) => status === TASK_STATUS.COMPLETED)
  const valid = completed.filter((record) => record.evidence?.valid)
  const workTypes = new Set(valid.map((record) => findDemoTask(record.taskId)?.workType).filter(Boolean))
  const positive = valid.filter((record) => record.reflection?.wantsRetry && Number(record.reflection?.interest) >= 4)
  const lowInterest = valid.filter((record) => Number(record.reflection?.interest) <= 2)

  let status = DIRECTION_STATUS.EXPLORING
  let summary = 'Đang thu thập evidence từ những trải nghiệm đầu tiên.'
  if (valid.length >= 2 && workTypes.size >= 2 && positive.length >= 2) {
    status = DIRECTION_STATUS.PRIORITY_DIRECTION
    summary = 'Hai task khác loại đều có evidence tốt và bạn vẫn muốn tiếp tục.'
  } else if (lowInterest.length) {
    status = DIRECTION_STATUS.DEPRIORITIZED
    summary = 'Bạn làm được nhưng ít hứng thú với quy trình ở trải nghiệm này; chưa loại toàn bộ ngành.'
  } else if (completed.some((record) => record.result?.outcome === 'NEEDS_MORE_EVIDENCE')) {
    status = DIRECTION_STATUS.NEEDS_MORE_EVIDENCE
    summary = 'Tín hiệu năng lực và hứng thú chưa đồng nhất, cần một task khác loại.'
  } else if (positive.length) {
    status = DIRECTION_STATUS.PROMISING
    summary = 'Có tín hiệu tích cực ban đầu; cần ít nhất một task khác loại để tăng độ tin cậy.'
  }

  return {
    majorId,
    status,
    summary,
    completedCount: completed.length,
    validEvidenceCount: valid.length,
    workTypeCount: workTypes.size,
    // Gợi ý trường là đầu ra của Assessment, không bị khóa bởi tiến độ task.
    canRecommendSchools: true,
    hasStrongTaskEvidence: status === DIRECTION_STATUS.PRIORITY_DIRECTION,
  }
}

export const STATUS_LABELS = {
  EXPLORING: 'Đang khám phá',
  PROMISING: 'Có tín hiệu triển vọng',
  NEEDS_MORE_EVIDENCE: 'Cần thêm bằng chứng',
  DEPRIORITIZED: 'Tạm giảm ưu tiên',
  PRIORITY_DIRECTION: 'Hướng nên ưu tiên',
  SELECTED: 'Đã chọn',
  NOT_STARTED: 'Chưa bắt đầu',
  IN_PROGRESS: 'Đang thực hiện',
  NEEDS_SUPPLEMENT: 'Cần bổ sung',
  SUBMITTED: 'Đã nộp',
  UNDER_REVIEW: 'Đang tổng hợp',
  COMPLETED: 'Đã hoàn thành',
  STOPPED: 'Đã dừng',
  ARCHIVED: 'Đã lưu trữ',
}
