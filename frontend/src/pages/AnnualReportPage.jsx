import { useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import HtmlReportFrame from '../components/report/HtmlReportFrame'
import { useAssessment } from '../context/AssessmentContext'
import { useAuth } from '../context/AuthContext'
import { getPersonalizedReportGroups, RIASEC_DIMENSIONS } from '../data/careerReport'
import reportTemplate from '../data/reportAssesSample.html?raw'
import {
  buildReportSnapshot,
  configureAcademicAnalysis,
  personalizeAssessmentReport,
  restructureAssessmentReportFlow,
} from '../utils/reportTemplatePersonalization'

const SECTION_LABELS = {
  overview: 'bản đồ định hướng tương lai',
  'personality-profile': 'Chân Dung Cá Nhân',
  'academic-performance': 'Phân Tích Học Tập & Điểm Tuyển Sinh',
  'top-3-categories': 'Top 3 Nhóm Ngành',
  advice: 'LỜI KHUYÊN ĐỊNH HƯỚNG',
  roadmap: 'Chặng tiếp theo',
}

function scrollToTemplateSection(document, dataPath, behavior = 'smooth') {
  const links = [...document.querySelectorAll('aside nav a')]
  links.forEach((link) => link.classList.remove('bg-primary-container', 'text-on-primary', 'shadow-sm', 'font-semibold'))
  const activeLink = links.find((link) => link.getAttribute('data-path') === dataPath)
  activeLink?.classList.add('bg-primary-container', 'text-on-primary', 'shadow-sm', 'font-semibold')

  if (dataPath === 'overview') {
    document.defaultView?.scrollTo({ top: 0, behavior })
    return true
  }
  const text = SECTION_LABELS[dataPath]
  const target = [...document.querySelectorAll('h1, h2, h3, span')]
    .find((element) => element.textContent?.includes(text))
  target?.closest('section')?.scrollIntoView({ behavior, block: 'start' })
  return Boolean(target)
}

function AnnualReportPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { user } = useAuth()
  const { assessment } = useAssessment()
  const snapshot = useMemo(() => buildReportSnapshot(user, assessment), [assessment, user])
  const groups = useMemo(() => {
    const riasec = snapshot.riasec ?? {
      scores: Object.fromEntries(Object.keys(RIASEC_DIMENSIONS).map((code) => [code, 0])),
      ranking: Object.keys(RIASEC_DIMENSIONS).map((code) => ({ code, score: 0 })),
    }
    return getPersonalizedReportGroups(riasec, assessment.profile, assessment.experience, 3)
  }, [assessment.experience, assessment.profile, snapshot.riasec])

  const handleAction = ({ document, element, label, onclick }) => {
    if (/xuất báo cáo pdf/i.test(label)) {
      navigate('/report/pdf')
      return true
    }
    if (/bắt đầu roadmap/i.test(label)) {
      navigate('/roadmap/setup/directions')
      return true
    }
    const groupTarget = onclick.match(/scrollToAndSelectTab\('tab-btn-(business|media|art)'\)/)?.[1]
    if (groupTarget) {
      const index = { business: 0, media: 1, art: 2 }[groupTarget]
      const group = groups[index]
      if (group) navigate(`/report/group/${group.id}`)
      return true
    }
    if (element.getAttribute('data-report-action') === 'update-scores' || /bổ sung điểm thi|cập nhật điểm thi/i.test(label)) {
      navigate('/assessment/quick-profile')
      return true
    }

    const majorCode = onclick.match(/selectMajor\(['"]([^'"]+)/)?.[1]
      ?? element.closest('[data-report-major-code]')?.dataset.reportMajorCode
    if (majorCode) {
      navigate(`/report/major/${majorCode}`)
      return true
    }

    const dataPath = element.getAttribute('data-path')
    if (dataPath && SECTION_LABELS[dataPath]) return scrollToTemplateSection(document, dataPath)
    if (element.tagName === 'A' && element.getAttribute('href') === '#') return true
    return false
  }

  return (
    <HtmlReportFrame
      html={reportTemplate}
      title="Báo cáo định hướng | UniView"
      onReady={(document) => {
        personalizeAssessmentReport(document, snapshot, groups)
        configureAcademicAnalysis(document, snapshot, groups[0]?.id)
        restructureAssessmentReportFlow(document, snapshot)
        const requestedSection = searchParams.get('section')
        if (requestedSection) {
          const frameWindow = document.defaultView
          frameWindow?.requestAnimationFrame(() => scrollToTemplateSection(document, requestedSection, 'auto'))
          frameWindow?.setTimeout(() => scrollToTemplateSection(document, requestedSection, 'auto'), 500)
          frameWindow?.setTimeout(() => scrollToTemplateSection(document, requestedSection, 'auto'), 1500)
        }
      }}
      onAction={handleAction}
    />
  )
}

export default AnnualReportPage
