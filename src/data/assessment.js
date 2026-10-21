// src/data/assessment.js
// Compatibility bridge.
// Mock assessment data now lives in assessment.json.
// Existing imports can keep working during the refactor.

import assessmentData from './assessment.json'

export const {
  riasecAssessment,
  personalityTypeAssessment,
} = assessmentData

export {
  scoreRiasec,
  scorePersonalityType,
} from '../utils/assessmentScoring'

export default assessmentData
