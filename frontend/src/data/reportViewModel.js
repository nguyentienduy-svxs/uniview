import { ANNUAL_DEMO_MAJORS } from './annualDemo.js'
import {
  getPersonalizedReportGroups,
  getRecommendedUniversities,
  MAJOR_DETAIL_IDS,
  RIASEC_DIMENSIONS,
} from './careerReport.js'
import { buildReportSnapshot } from '../utils/reportTemplatePersonalization.js'

const REPORT_GROUPS = [
  {
    id: 'technology-analysis',
    name: 'Công nghệ & Phân tích',
    sourceIds: ['technology-software', 'analysis-management'],
  },
  {
    id: 'business-economics',
    name: 'Kinh doanh & Kinh tế',
    sourceIds: ['marketing-business', 'economics-finance'],
  },
  {
    id: 'creative-people',
    name: 'Sáng tạo & Con người',
    sourceIds: ['digital-design', 'communications-people'],
  },
]

const emptyRiasec = () => ({
  scores: Object.fromEntries(Object.keys(RIASEC_DIMENSIONS).map((code) => [code, 0])),
  ranking: [],
  top3: '',
})

function roadmapFor(majorId, journeyState = {}, userId, assessmentResultId) {
  const major = ANNUAL_DEMO_MAJORS.find((item) => item.id === majorId)
  const records = major?.tasks.map((task) => journeyState.taskRecords?.[task.id]).filter(Boolean) ?? []
  const completed = records.filter((record) => record.status === 'COMPLETED').length
  const total = major?.tasks.length ?? 0
  const stored = journeyState.majorRoadmaps?.[majorId]
  return {
    ...(stored ?? {
    id: `roadmap-${userId ?? 'guest'}-${majorId}`,
    userId: userId ?? null,
    assessmentResultId,
    majorId,
    }),
    status: completed > 0 && completed === total ? 'COMPLETED' : records.length ? 'IN_PROGRESS' : stored?.status ?? 'NOT_STARTED',
    progress: total ? Math.round((completed / total) * 100) : stored?.progress ?? 0,
  }
}

export function buildAssessmentReportViewModel({
  user,
  assessment,
  journeyState = {},
  isMockMode = false,
}) {
  const snapshot = buildReportSnapshot(user, assessment)
  const riasec = snapshot.riasec ?? emptyRiasec()
  const sourceGroups = getPersonalizedReportGroups(
    riasec,
    assessment.profile,
    assessment.experience,
    6,
  )
  const hasAssessmentResult = Boolean(assessment.report)
    || Object.keys(assessment.riasecAnswers ?? {}).length === 30
  const sourceById = new Map(sourceGroups.map((group) => [group.id, group]))
  const assessmentResultId = assessment.report?.id ?? snapshot.reportCode

  const groups = (!isMockMode && !hasAssessmentResult ? [] : REPORT_GROUPS).map((definition) => {
    const sources = definition.sourceIds.map((id) => sourceById.get(id)).filter(Boolean)
    const majors = sources.flatMap((group) => group.majors).map((major) => {
      const roadmapMajor = ANNUAL_DEMO_MAJORS.find((item) => item.id === major.id)
      return {
        ...major,
        code: MAJOR_DETAIL_IDS[major.id] ?? 'Chưa đối chiếu',
        schools: getRecommendedUniversities(major.id, assessment.profile).slice(0, 3),
        roadmapTasks: roadmapMajor?.tasks.slice(0, 3).map((task) => ({ id: task.id, title: task.title, duration: task.duration })) ?? [],
        isSaved: Boolean(journeyState.majorShortlist?.includes(major.id)),
        roadmap: roadmapFor(major.id, journeyState, user?.id, assessmentResultId),
      }
    })
    const priorityScore = sources.length
      ? Math.round(sources.reduce((sum, group) => sum + group.matchScore, 0) / sources.length)
      : 0
    return {
      ...definition,
      priorityScore,
      personalizedReason: sources.map((group) => group.personalizedReason).join(' '),
      unknown: sources.map((group) => group.unknown).join(' '),
      evidenceParts: sources.flatMap((group) => group.evidenceParts).slice(0, 3),
      majors,
    }
  }).sort((left, right) => right.priorityScore - left.priorityScore)

  return {
    version: 1,
    assessmentResultId,
    hasAssessmentResult,
    isMockMode,
    snapshot,
    riasec,
    profile: assessment.profile ?? {},
    groups,
    majors: groups.flatMap((group) => group.majors.map((major) => ({
      ...major,
      reportGroupId: group.id,
      reportGroupName: group.name,
    }))),
  }
}

export function findReportMajor(viewModel, majorId) {
  return viewModel.majors.find((major) => major.id === majorId || major.code === majorId)
}

