import { createContext, useContext, useEffect, useMemo, useState } from 'react'

import { findDemoMajor, findDemoTask } from '../data/annualDemo'
import { PLAN_IDS } from '../data/plans'
import { canOpenTask, canStartTask, countOpenTasks, getCapabilities, SLOT_TASK_STATUSES, TASK_STATUS } from '../domain/accessPolicy'
import { useAuth } from './AuthContext'

const JourneyContext = createContext(null)
const STORAGE_PREFIX = 'uniview-journey-v1'
const now = () => new Date().toISOString()
const LEGACY_MAJOR_IDS = {
  'digital-art-design': 'communication-design',
  'software-engineering': 'information-technology',
  'banking-finance': 'banking',
  'business-analytics': 'business-analysis',
  'ui-ux-design': 'ui-ux',
}

function createInitialState() {
  return {
    version: 2,
    assessmentComplete: true,
    reportGeneratedAt: '2026-10-15T09:00:00.000Z',
    selectedMajorIds: ['information-technology', 'marketing', 'finance'],
    setupTaskIds: [],
    taskRecords: {},
    validationReports: {},
    shortlist: [],
    shortlistNotes: {},
    decisionChoices: [],
    roadmapCreatedAt: null,
    updatedAt: now(),
  }
}

const storageKey = (userId) => `${STORAGE_PREFIX}:${userId}`

function readState(userId) {
  if (!userId || typeof window === 'undefined') return createInitialState()
  try {
    const parsed = JSON.parse(window.localStorage.getItem(storageKey(userId)))
    if (!parsed) return createInitialState()
    const merged = { ...createInitialState(), ...parsed, version: 2 }
    const migratedMajors = [...new Set((merged.selectedMajorIds ?? []).map((id) => LEGACY_MAJOR_IDS[id] ?? id))]
      .filter((id) => findDemoMajor(id))
    const validTaskRecords = Object.fromEntries(Object.entries(merged.taskRecords ?? {}).filter(([taskId]) => findDemoTask(taskId)))
    const validSetupTasks = (merged.setupTaskIds ?? []).filter((taskId) => findDemoTask(taskId))
    return {
      ...merged,
      selectedMajorIds: migratedMajors.length ? migratedMajors : createInitialState().selectedMajorIds,
      setupTaskIds: validSetupTasks,
      taskRecords: validTaskRecords,
    }
  } catch {
    return createInitialState()
  }
}

function recordFor(taskId, overrides = {}) {
  return {
    taskId,
    status: TASK_STATUS.SELECTED,
    progress: 0,
    selectedAt: now(),
    startedAt: null,
    completedAt: null,
    stoppedAt: null,
    stopReason: '',
    draft: '',
    evidence: { text: '', link: '', files: [], explanation: '', valid: false },
    reflection: null,
    result: null,
    activity: 'Vừa được thêm vào Roadmap',
    ...overrides,
  }
}

function demoCompletedRecord(taskId, interest = 5) {
  const task = findDemoTask(taskId)
  return recordFor(taskId, {
    status: TASK_STATUS.COMPLETED,
    progress: 100,
    startedAt: '2026-10-12T08:00:00.000Z',
    completedAt: '2026-10-13T10:00:00.000Z',
    evidence: {
      text: `Bài làm mẫu cho task “${task?.title ?? taskId}”.`,
      link: 'https://example.com/uniview-demo-evidence',
      files: [{ name: 'minh-anh-evidence.pdf', size: 428000, type: 'application/pdf' }],
      explanation: 'Em đã thử hai phương án, xin phản hồi và chỉnh sửa trước khi chọn bản cuối.',
      valid: true,
    },
    reflection: {
      interest,
      focus: 4,
      likedMost: 'Được biến ý tưởng thành sản phẩm và giải thích lựa chọn của mình.',
      drainedBy: 'Mất thời gian ở vòng chỉnh sửa chi tiết nhưng em vẫn muốn tiếp tục.',
      wantsRetry: true,
      shareWithParent: false,
    },
    result: {
      outcome: 'POSITIVE_SIGNAL',
      taskPerformance: 'Đạt yêu cầu',
      studentInterest: 'Cao',
      evidenceCompleteness: 'Đầy đủ',
      confidenceLevel: 'Đủ để đề xuất bước kiểm chứng sâu hơn',
    },
    activity: 'Hoàn thành ngày 13/10/2026',
  })
}

function seedScenario(scenario) {
  const base = createInitialState()
  if (scenario === 'ANNUAL_ROADMAP') {
    const ids = ['information-technology-task-1', 'marketing-task-1', 'finance-task-1']
    return {
      ...base,
      roadmapCreatedAt: '2026-10-15T09:00:00.000Z',
      taskRecords: Object.fromEntries(ids.map((id, index) => [id, recordFor(id, {
        status: index === 0 ? TASK_STATUS.IN_PROGRESS : TASK_STATUS.NOT_STARTED,
        progress: index === 0 ? 35 : 0,
        startedAt: index === 0 ? '2026-10-16T08:00:00.000Z' : null,
        activity: index === 0 ? 'Đã tự động lưu bản nháp hôm nay' : 'Chưa bắt đầu',
      })])),
    }
  }
  if (scenario === 'ANNUAL_INSIGHTS') {
    const records = [
      demoCompletedRecord('information-technology-task-1'),
      demoCompletedRecord('information-technology-task-2'),
      demoCompletedRecord('marketing-task-1', 4),
    ]
    return {
      ...base,
      roadmapCreatedAt: '2026-10-10T09:00:00.000Z',
      taskRecords: Object.fromEntries(records.map((record) => [record.taskId, record])),
    }
  }
  return base
}

function buildTaskResult(record) {
  const interest = Number(record.reflection?.interest ?? 3)
  const valid = Boolean(record.evidence?.valid)
  const wantsRetry = Boolean(record.reflection?.wantsRetry)
  if (valid && interest >= 4 && wantsRetry) {
    return {
      outcome: 'POSITIVE_SIGNAL', taskPerformance: 'Đạt yêu cầu', studentInterest: 'Cao',
      evidenceCompleteness: 'Đầy đủ', confidenceLevel: 'Đủ để đề xuất một task khác loại, chưa phải kết luận ngành',
    }
  }
  if (valid && interest <= 2) {
    return {
      outcome: 'LOW_INTEREST', taskPerformance: 'Có thể thực hiện', studentInterest: 'Thấp ở trải nghiệm này',
      evidenceCompleteness: 'Đầy đủ', confidenceLevel: 'Cần đối chiếu bằng một loại công việc khác trước khi loại ngành',
    }
  }
  return {
    outcome: 'NEEDS_MORE_EVIDENCE', taskPerformance: valid ? 'Chưa ổn định' : 'Chưa thể đánh giá',
    studentInterest: interest >= 4 ? 'Có hứng thú' : 'Chưa rõ', evidenceCompleteness: valid ? 'Đủ tối thiểu' : 'Cần bổ sung',
    confidenceLevel: 'Thấp – cần thêm evidence hoặc task khác loại',
  }
}

export function JourneyProvider({ children }) {
  const { activePlans, user } = useAuth()
  const [state, setState] = useState(() => readState(user?.id))
  const [loadedUserId, setLoadedUserId] = useState(user?.id ?? null)
  const [toast, setToast] = useState(null)
  const capabilities = useMemo(() => getCapabilities(activePlans), [activePlans])

  useEffect(() => {
    const nextUserId = user?.id ?? null
    if (nextUserId === loadedUserId) return
    setState(readState(nextUserId))
    setLoadedUserId(nextUserId)
  }, [user?.id, loadedUserId])

  useEffect(() => {
    if (!loadedUserId || typeof window === 'undefined') return
    window.localStorage.setItem(storageKey(loadedUserId), JSON.stringify(state))
  }, [state, loadedUserId])

  useEffect(() => {
    if (!toast) return undefined
    const timer = window.setTimeout(() => setToast(null), 2800)
    return () => window.clearTimeout(timer)
  }, [toast])

  const update = (recipe) => setState((current) => ({ ...recipe(current), updatedAt: now() }))
  const selectMajors = (majorIds) => update((current) => ({ ...current, selectedMajorIds: majorIds }))
  const selectSetupTasks = (taskIds) => update((current) => ({ ...current, setupTaskIds: taskIds }))

  const addTaskToRoadmap = (taskId) => {
    if (!findDemoTask(taskId)) return false
    if (state.taskRecords[taskId]) return true
    const quota = canOpenTask(state.taskRecords, capabilities.taskPolicy)
    if (!quota.allowed) {
      setToast({ type: 'warning', message: quota.reason })
      return false
    }
    update((current) => ({
      ...current,
      taskRecords: { ...current.taskRecords, [taskId]: recordFor(taskId) },
      roadmapCreatedAt: current.roadmapCreatedAt ?? now(),
    }))
    return true
  }

  const confirmRoadmap = () => {
    const quota = canOpenTask(state.taskRecords, capabilities.taskPolicy)
    const acceptedIds = quota.allowed ? state.setupTaskIds.slice(0, quota.availableSlots) : []
    update((current) => ({
      ...current,
      roadmapCreatedAt: current.roadmapCreatedAt ?? now(),
      setupTaskIds: [],
      taskRecords: acceptedIds.reduce((records, taskId) => ({
        ...records, [taskId]: records[taskId] ?? recordFor(taskId),
      }), current.taskRecords),
    }))
    setToast({ type: 'success', message: `Đã thêm ${acceptedIds.length} task vào Roadmap.` })
    return acceptedIds
  }

  const startTask = (taskId) => {
    const permission = canStartTask(state.taskRecords, capabilities.taskPolicy, taskId)
    if (!permission.allowed) {
      setToast({ type: 'warning', message: permission.reason })
      return permission
    }
    update((current) => ({
      ...current,
      taskRecords: {
        ...current.taskRecords,
        [taskId]: {
          ...(current.taskRecords[taskId] ?? recordFor(taskId)),
          status: TASK_STATUS.IN_PROGRESS,
          progress: Math.max(10, current.taskRecords[taskId]?.progress ?? 0),
          startedAt: current.taskRecords[taskId]?.startedAt ?? now(),
          activity: 'Đã bắt đầu và sẵn sàng lưu nháp',
        },
      },
    }))
    return { allowed: true }
  }

  const saveDraft = (taskId, draft) => update((current) => ({
    ...current,
    taskRecords: {
      ...current.taskRecords,
      [taskId]: {
        ...(current.taskRecords[taskId] ?? recordFor(taskId)),
        status: TASK_STATUS.IN_PROGRESS,
        startedAt: current.taskRecords[taskId]?.startedAt ?? now(),
        progress: draft.trim() ? 45 : 15,
        draft,
        activity: 'Đã tự động lưu bản nháp vừa xong',
      },
    },
  }))

  const saveEvidence = (taskId, evidence) => {
    const valid = Boolean((evidence.text?.trim() || evidence.link?.trim() || evidence.files?.length) && evidence.explanation?.trim())
    update((current) => ({
      ...current,
      taskRecords: {
        ...current.taskRecords,
        [taskId]: {
          ...(current.taskRecords[taskId] ?? recordFor(taskId)),
          status: valid ? TASK_STATUS.UNDER_REVIEW : TASK_STATUS.NEEDS_SUPPLEMENT,
          progress: valid ? 75 : 55,
          evidence: { ...evidence, valid },
          activity: valid ? 'Evidence đã nộp, đang chờ reflection' : 'Evidence cần được bổ sung',
        },
      },
    }))
    setToast({ type: valid ? 'success' : 'warning', message: valid ? 'Evidence hợp lệ và đã được lưu.' : 'Cần có evidence và phần giải thích trước khi tiếp tục.' })
    return valid
  }

  const saveReflection = (taskId, reflection) => update((current) => {
    const record = { ...(current.taskRecords[taskId] ?? recordFor(taskId)), reflection }
    return {
      ...current,
      taskRecords: {
        ...current.taskRecords,
        [taskId]: { ...record, progress: 90, result: buildTaskResult(record), activity: 'Đã hoàn thành reflection riêng tư' },
      },
    }
  })

  const completeTask = (taskId) => {
    update((current) => {
      const completedAt = now()
      const taskRecords = {
        ...current.taskRecords,
        [taskId]: { ...current.taskRecords[taskId], status: TASK_STATUS.COMPLETED, progress: 100, completedAt, activity: 'Vừa hoàn thành – slot đã được giải phóng' },
      }
      const majorId = findDemoTask(taskId)?.majorId
      const initialTaskIds = findDemoMajor(majorId)?.tasks.slice(0, 3).map(({ id }) => id) ?? []
      const initialStageComplete = initialTaskIds.every((id) => taskRecords[id]?.status === TASK_STATUS.COMPLETED && taskRecords[id]?.reflection)
      if (!initialStageComplete) return { ...current, taskRecords }
      const taskIds = Object.values(taskRecords)
        .filter((record) => findDemoTask(record.taskId)?.majorId === majorId && record.status === TASK_STATUS.COMPLETED && record.reflection)
        .map((record) => record.taskId)
      const previousReport = current.validationReports?.[majorId]
      const revision = {
        version: (previousReport?.version ?? 0) + 1,
        updatedAt: completedAt,
        taskIds,
        taskRecords: Object.fromEntries(taskIds.map((id) => [id, taskRecords[id]])),
      }
      const validationReports = {
        ...current.validationReports,
        [majorId]: { ...revision, revisions: [...(previousReport?.revisions ?? []), revision] },
      }
      return { ...current, taskRecords, validationReports }
    })
    setToast({ type: 'success', message: 'Task đã hoàn thành và giải phóng một slot.' })
  }

  const resetCompletedTasks = () => {
    const completedTaskIds = Object.values(state.taskRecords)
      .filter(({ status }) => status === TASK_STATUS.COMPLETED)
      .map(({ taskId }) => taskId)
    if (!completedTaskIds.length) {
      setToast({ type: 'warning', message: 'Chưa có task hoàn thành để đặt lại.' })
      return 0
    }

    const affectedMajorIds = new Set(completedTaskIds.map((taskId) => findDemoTask(taskId)?.majorId).filter(Boolean))
    update((current) => ({
      ...current,
      taskRecords: Object.fromEntries(Object.entries(current.taskRecords).map(([taskId, record]) => (
        completedTaskIds.includes(taskId) ? [taskId, recordFor(taskId)] : [taskId, record]
      ))),
      validationReports: Object.fromEntries(Object.entries(current.validationReports ?? {}).filter(([majorId]) => (
        !affectedMajorIds.has(majorId)
      ))),
    }))
    setToast({ type: 'success', message: `Đã đặt lại ${completedTaskIds.length} task hoàn thành để bạn demo lại.` })
    return completedTaskIds.length
  }

  const stopTask = (taskId, reason) => {
    update((current) => ({
      ...current,
      taskRecords: {
        ...current.taskRecords,
        [taskId]: { ...current.taskRecords[taskId], status: TASK_STATUS.STOPPED, stoppedAt: now(), stopReason: reason, activity: 'Đã dừng – bản nháp và lịch sử vẫn được giữ' },
      },
    }))
    setToast({ type: 'success', message: 'Đã dừng task và giải phóng slot; dữ liệu cũ vẫn được giữ.' })
  }

  const removeSelectedTask = (taskId) => update((current) => {
    const record = current.taskRecords[taskId]
    if (record?.startedAt) return current
    const next = { ...current.taskRecords }
    delete next[taskId]
    return { ...current, taskRecords: next }
  })

  const toggleShortlist = (schoolId) => {
    const exists = state.shortlist.includes(schoolId)
    update((current) => ({ ...current, shortlist: exists ? current.shortlist.filter((id) => id !== schoolId) : [...current.shortlist, schoolId] }))
    setToast({ type: 'success', message: exists ? 'Đã xóa khỏi Shortlist.' : 'Đã lưu trường vào Shortlist.' })
  }

  const updateShortlistNote = (schoolId, note) => update((current) => ({
    ...current,
    shortlistNotes: { ...current.shortlistNotes, [schoolId]: note },
  }))

  const addDecisionChoice = (selection) => {
    const duplicate = state.decisionChoices.some((choice) => choice.universityId === selection.universityId
      && choice.program === selection.program && choice.location === selection.campus && choice.cohort === `Khóa ${selection.year}`)
    if (duplicate) {
      setToast({ type: 'warning', message: 'Lựa chọn này đã có trong Decision Board.' })
      return false
    }
    const choiceId = `roadmap-${selection.universityId}-${selection.year}-${state.decisionChoices.length + 1}`
    const acronym = selection.university.split(/\s+/).filter(Boolean).slice(0, 2).map((word) => word[0]).join('').toUpperCase()
    update((current) => ({
      ...current,
      decisionChoices: [...current.decisionChoices, {
        id: choiceId,
        universityId: selection.universityId,
        acronym,
        university: selection.university,
        location: selection.campus || 'Cần xác minh cơ sở',
        cohort: `Khóa ${selection.year}`,
        major: selection.major,
        program: selection.program,
        majorCode: 'Cần xác minh',
        methods: selection.method ? [selection.method] : ['Chưa xác minh phương thức tuyển sinh'],
        priority: selection.priority,
        status: 'considering',
        statusLabel: 'Đang cân nhắc',
        statusTone: 'slate',
        reminder: 'Chưa bật nhắc lịch',
        nextMilestone: { label: 'Đề án tuyển sinh', date: `Cần xác minh năm ${selection.year}`, note: 'Chưa có mốc chính thức', tone: 'slate' },
        alert: `Thông tin chương trình và tuyển sinh cần được xác minh cho năm ${selection.year}.`,
        rounds: selection.method ? [selection.method] : ['Chưa xác minh phương thức tuyển sinh'],
        timeline: [],
        checklist: [],
        source: { title: 'Lựa chọn cá nhân từ báo cáo kiểm chứng', code: 'Thông tin do học sinh lưu', updatedAt: now() },
        contact: { phone: '', email: '' },
      }],
    }))
    setToast({ type: 'success', message: `Đã thêm ${selection.program} vào Decision Board.` })
    return true
  }

  const resetDemo = (scenario = 'ANNUAL_DEMO') => {
    setState(seedScenario(scenario))
    setToast({ type: 'success', message: 'Đã đặt lại dữ liệu demo.' })
  }

  const openTaskCount = countOpenTasks(state.taskRecords)
  const availableSlots = Math.max(0, capabilities.taskPolicy.openTaskLimit - openTaskCount)
  const openTasks = Object.values(state.taskRecords).filter(({ status }) => SLOT_TASK_STATUSES.has(status))
  const historyTasks = Object.values(state.taskRecords).filter(({ status }) => !SLOT_TASK_STATUSES.has(status))

  return (
    <JourneyContext.Provider value={{
      state, capabilities, toast, openTaskCount, availableSlots, openTasks, historyTasks,
      selectMajors, selectSetupTasks, confirmRoadmap, addTaskToRoadmap, startTask, saveDraft, saveEvidence,
      saveReflection, completeTask, resetCompletedTasks, stopTask, removeSelectedTask, toggleShortlist, resetDemo,
      setToast, updateShortlistNote, addDecisionChoice, taskStatuses: TASK_STATUS,
      isAnnualDemo: capabilities.subscriptionPlan === PLAN_IDS.ANNUAL,
    }}>
      {children}
    </JourneyContext.Provider>
  )
}

export function useJourney() {
  const context = useContext(JourneyContext)
  if (!context) throw new Error('useJourney must be used inside JourneyProvider')
  return context
}
