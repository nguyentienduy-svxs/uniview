import { riasecAssessment } from '../data/assessment'
import { certificateEvidenceWeight } from './certificates'

export function scoreRiasec(
  answers = {},
) {
  const scores = {
    R: 0,
    I: 0,
    A: 0,
    S: 0,
    E: 0,
    C: 0,
  }

  for (
    const question
    of riasecAssessment.questions
  ) {
    const value =
      Number(
        answers[question.id],
      )

    if (
      value >= 1 &&
      value <= 5
    ) {
      scores[question.domain] += value
    }
  }

  for (const code of Object.keys(scores)) {
    scores[code] = Math.round(
      (((scores[code] / 5 - 1) / 4) *
        100) *
        10,
    ) / 10
  }

  const ranking =
    Object.entries(scores)
      .map(
        ([code, score]) => ({
          code,
          score,
        }),
      )
      .sort(
        (a, b) =>
          b.score - a.score,
      )

  return {
    scores,
    ranking,

    flags:
      ranking[0].score - ranking[1].score < 5
        ? ['RIASEC_CLOSE_RANGE']
        : [],

    top3: ranking
      .slice(0, 3)
      .map(
        (item) => item.code,
      )
      .join('-'),
  }
}

export function createLocalAssessmentReport(
  assessment,
  payload,
) {
  const riasec = scoreRiasec(
    assessment.riasecAnswers,
  )
  const experienceCount =
    assessment.experience.selectedDomains.length
  const certificateWeight = certificateEvidenceWeight(
    assessment.profile.certificates,
  )
  const academicStatusWeight = [
    ['gpa', 'gpaStatus'],
    ['thptScore', 'thptScoreStatus'],
    ['dgnlScore', 'dgnlScoreStatus'],
  ].reduce((total, [valueKey, statusKey]) => {
    if (!assessment.profile[valueKey]) return total
    return total + (assessment.profile[statusKey] === 'OFFICIAL' ? 1 : 0.5)
  }, 0)
  const completeness =
    (Object.keys(assessment.riasecAnswers)
      .length /
      30) *
      0.6 +
    (assessment.experience.noExperience ||
    experienceCount
      ? 0.2
      : 0) +
    (assessment.profile.admissionYear ? 0.2 : 0)
  const confidence = Math.round(
    Math.min(
      94,
      completeness * 70 +
        Math.min(experienceCount * 6, 18) +
        (certificateWeight === 90
          ? 4
          : certificateWeight === 60
            ? 2
            : 0) +
        academicStatusWeight,
    ),
  )
  const generatedAt = new Date().toISOString()

  return {
    id: `uv-local-${Date.now().toString(36)}`,
    assessmentVersion: '2026.1',
    scoringModelVersion:
      'uniview-direction-1.0.0-local',
    generatedAt,
    inputSnapshot: structuredClone(payload),
    clientInputSnapshot:
      structuredClone(assessment),
    overview: {
      riasec,
      confidence: {
        score: confidence,
        label:
          confidence >= 75
            ? 'HIGH'
            : confidence >= 50
              ? 'MEDIUM'
              : 'LOW',
      },
      disclaimer:
        'Kết quả hỗ trợ khám phá, không khẳng định một “ngành hoàn hảo”.',
    },
    qualityFlags: [
      ...riasec.flags,
      ...(experienceCount ||
      assessment.experience.noExperience
        ? []
        : ['LIMITED_EXPERIENCE']),
    ],
  }
}
