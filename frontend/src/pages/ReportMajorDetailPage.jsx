import { useMemo } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

import HtmlReportFrame from '../components/report/HtmlReportFrame'
import { useAssessment } from '../context/AssessmentContext'
import { useAuth } from '../context/AuthContext'
import {
  getPersonalizedReportGroups,
  MAJOR_DETAIL_IDS,
  RIASEC_DIMENSIONS,
} from '../data/careerReport'
import majorDetailTemplate from '../data/majorDetailReport.html?raw'
import majorDetails from '../data/majorDetails.json'
import {
  buildReportSnapshot,
  normalizeReportNavigation,
  personalizeMajorReport,
} from '../utils/reportTemplatePersonalization'

function ReportMajorDetailPage() {
  const navigate = useNavigate()
  const { majorId } = useParams()
  const [searchParams] = useSearchParams()
  const sourceGroupId = searchParams.get('group')
  const { user } = useAuth()
  const { assessment } = useAssessment()
  const snapshot = useMemo(() => buildReportSnapshot(user, assessment), [assessment, user])
  const major = useMemo(() => majorDetails.find((item) => item.id === majorId || item.slug === majorId)
    ?? majorDetails.find((item) => item.id === '7340115'), [majorId])
  const personalizedMajors = useMemo(() => {
    const riasec = snapshot.riasec ?? {
      scores: Object.fromEntries(Object.keys(RIASEC_DIMENSIONS).map((code) => [code, 0])),
      ranking: Object.keys(RIASEC_DIMENSIONS).map((code) => ({ code, score: 0 })),
    }
    return getPersonalizedReportGroups(riasec, assessment.profile, assessment.experience, 6)
      .flatMap((group) => group.majors.map((item) => ({ ...item, groupName: group.name })))
  }, [assessment.experience, assessment.profile, snapshot.riasec])
  const careerMajor = personalizedMajors.find((item) => MAJOR_DETAIL_IDS[item.id] === major.id)
    ?? personalizedMajors.find((item) => item.name.toLocaleLowerCase('vi').includes(major.name.toLocaleLowerCase('vi')))
  const matchScore = careerMajor?.matchScore ?? Math.max(60, snapshot.completeness)

  const handleAction = ({ element, label }) => {
    if (/quay lại danh sách ngành/i.test(label)) {
      navigate(sourceGroupId ? `/report/group/${sourceGroupId}` : '/report')
      return true
    }
    if (/báo cáo assessment/i.test(label)) {
      navigate('/report')
      return true
    }
    if (/xuất pdf ngành|xuất báo cáo pdf/i.test(label)) {
      navigate(`/report/pdf?major=${major.id}`)
      return true
    }
    if (/so sánh chi tiết 3 trường/i.test(label)) {
      navigate(`/compare?major=${major.id}`)
      return true
    }
    if (/roadmap|kiểm chứng ngành/i.test(label)) {
      navigate('/roadmap/setup/directions')
      return true
    }
    const dataPath = element.getAttribute('data-path')
    if (dataPath) {
      navigate(`/report?section=${dataPath}`)
      return true
    }
    if (element.tagName === 'A' && element.getAttribute('href') === '#') return true
    return false
  }

  return (
    <HtmlReportFrame
      html={majorDetailTemplate}
      title={`${major.name} · Báo cáo chi tiết | UniView`}
      onReady={(document) => {
        personalizeMajorReport(document, snapshot, major, careerMajor, matchScore)
        normalizeReportNavigation(document, 'top-3-categories')
      }}
      onAction={handleAction}
    />
  )
}

export default ReportMajorDetailPage
