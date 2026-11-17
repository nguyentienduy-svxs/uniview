import { Navigate, useParams } from 'react-router-dom'

const LEGACY_GROUPS = {
  'technology-software': 'technology-analysis',
  'analysis-management': 'technology-analysis',
  'marketing-business': 'business-economics',
  'economics-finance': 'business-economics',
  'digital-design': 'creative-people',
  'communications-people': 'creative-people',
}

function ReportMajorGroupPage() {
  const { groupId } = useParams()
  const group = LEGACY_GROUPS[groupId] ?? groupId ?? 'technology-analysis'
  return <Navigate to={`/report?tab=majors&group=${group}`} replace />
}

export default ReportMajorGroupPage
