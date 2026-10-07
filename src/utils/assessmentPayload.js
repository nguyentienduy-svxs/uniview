export function buildAssessmentPayload(
  assessment,
  userId,
  paidAttempt = false,
) {
  const experienceDomains =
    assessment.experience.selectedDomains.map(
      (domain) => {
        const state =
          assessment.experience.domainStates[domain] ??
          { baseAnswers: {}, adaptiveAnswers: [] }
        const answers = state.baseAnswers

        return {
          domain,
          domainId: domain,
          recency: answers.recency,
          frequency: answers.frequency,
          voluntaryLevel: answers.voluntaryLevel,
          role: answers.role,
          outcome: answers.outcome,
          artifactUrl: state.artifactUrl || undefined,
          adaptiveBranch: state.adaptiveBranch,
          adaptiveAnswers: state.adaptiveAnswers,
          baseEvidenceScore: state.baseEvidenceScore,
          finalEvidenceScore: state.finalEvidenceScore,
          verificationStatus: state.verificationStatus,
        }
      },
    )

  return {
    userId,
    paidAttempt,
    riasecAnswers: assessment.riasecAnswers,
    mbtiAnswers: assessment.personalityAnswers,
    experience: {
      noExperience:
        assessment.experience.noExperience,
      domains: experienceDomains,
    },
    profile: {
      admissionYear:
        assessment.profile.admissionYear,
      regions: assessment.profile.regions,
      tuitionRange: assessment.profile.tuition,
      scholarship:
        assessment.profile.scholarship,
      strengths: assessment.profile.strengths,
      gpa: assessment.profile.gpa || undefined,
      gpaStatus: assessment.profile.gpaStatus,
      thptScore:
        assessment.profile.thptScore || undefined,
      thptScoreStatus: assessment.profile.thptScoreStatus,
      dgnlScore:
        assessment.profile.dgnlScore || undefined,
      dgnlScoreStatus: assessment.profile.dgnlScoreStatus,
      certificates:
        assessment.profile.certificates,
      priorities: assessment.profile.priorities,
    },
  }
}
