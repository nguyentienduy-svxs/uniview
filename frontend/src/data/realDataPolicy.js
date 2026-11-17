// Only screens backed by implemented API contracts may render data in real mode.
// Keep demo workflows unavailable until their own backend contracts exist.
export const DEMO_ONLY_PAGES = new Set([
  'UniversityCompareModalPage', 'UniversityComparisonPage',
  'AnnualReportPage', 'ReportMajorDetailPage', 'ReportMajorGroupPage', 'ReportPdfPage',
  'PersonalDirectionReportPage', 'RoadmapDirectionSetupPage', 'RoadmapTaskSetupPage',
  'RoadmapConfirmPage', 'RoadmapPage', 'MajorValidationReportPage', 'MajorRoadmapDetailPage',
  'TaskDetailPage', 'TaskWorkspacePage', 'TaskReviewPage', 'TaskReflectionPage', 'TaskResultPage',
  'DiscoverySummaryPage', 'SchoolRecommendationsPage', 'ShortlistPage',
  'AdmissionCheckerPage', 'AdmissionRoadmapPage', 'AdmissionRouteMappingPage',
  'ScenarioComparisonPage', 'DecisionBoardPage', 'DecisionBoardDetailPage',
  'PersonalizedShortlistPage',
  'SecureCheckoutPage', 'PersonalDirectionCheckoutPage', 'AdmissionPassCheckoutPage', 'CheckoutSuccessPage',
])

export function realPagePolicy(component) {
  if (['UniversityComparisonPage', 'AdmissionCheckerPage', 'ScenarioComparisonPage', 'AdmissionRoadmapPage', 'AdmissionRouteMappingPage'].includes(component)) return { inline: true }
  if (component === 'MajorDetailPage') return { kind: 'majors', detail: true }
  if (component === 'UitUniversityPage') return { kind: 'universities', detail: true }
  return DEMO_ONLY_PAGES.has(component) ? { unavailable: true } : null
}
