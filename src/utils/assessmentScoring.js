import assessmentData from '../data/assessment.json'
import { certificateEvidenceWeight } from './certificates'

const {
  riasecAssessment,
  personalityTypeAssessment,
} = assessmentData

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

export function scorePersonalityType(
  answers = {},
) {
  const scores = {
    E: 0,
    I: 0,
    S: 0,
    N: 0,
    T: 0,
    F: 0,
    J: 0,
    P: 0,
  }

  for (
    const question
    of personalityTypeAssessment.questions
  ) {
    const value =
      answers[question.id]

    if (
      value &&
      Object.prototype.hasOwnProperty.call(
        scores,
        value,
      )
    ) {
      scores[value] += 1
    }
  }

  const type =
    (scores.E >= scores.I
      ? 'E'
      : 'I') +
    (scores.S >= scores.N
      ? 'S'
      : 'N') +
    (scores.T >= scores.F
      ? 'T'
      : 'F') +
    (scores.J >= scores.P
      ? 'J'
      : 'P')

  const axes = {}

  for (const axis of ['EI', 'SN', 'TF', 'JP']) {
    const [left, right] = axis
    const leftCount = scores[left]
    const rightCount = scores[right]
    const clarity =
      Math.round(
        ((Math.abs(leftCount - rightCount) /
          15) *
          100) *
          10,
      ) / 10

    axes[axis] = {
      counts: {
        [left]: leftCount,
        [right]: rightCount,
      },
      percentages: {
        [left]:
          Math.round(
            (leftCount / 15) * 1000,
          ) / 10,
        [right]:
          Math.round(
            (rightCount / 15) * 1000,
          ) / 10,
      },
      clarity,
      clarityLabel:
        clarity >= 40
          ? 'CLEAR'
          : clarity >= 20
            ? 'MODERATE'
            : 'BORDERLINE',
    }
  }

  return {
    scores,
    type,
    axes,
    disclaimer:
      'Chỉ báo phong cách kiểu MBTI, không phải bài MBTI chính thức.',
  }
}

export function createLocalAssessmentReport(
  assessment,
  payload,
) {
  const riasec = scoreRiasec(
    assessment.riasecAnswers,
  )
  const mbti = scorePersonalityType(
    assessment.personalityAnswers,
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
      0.3 +
    (Object.keys(assessment.personalityAnswers)
      .length /
      60) *
      0.3 +
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
      'direction-snapshot-1.0.0-local',
    generatedAt,
    inputSnapshot: structuredClone(payload),
    clientInputSnapshot:
      structuredClone(assessment),
    overview: {
      riasec,
      mbti,
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
    attempt: {
      consumed: false,
      remaining: null,
    },
  }
}
