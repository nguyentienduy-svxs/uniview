import test from 'node:test'
import assert from 'node:assert/strict'

import {
  CERTIFICATE_STATUS,
  certificateEvidenceWeight,
  normalizeCertificates,
} from './certificates.js'

test('migrate chứng chỉ chuỗi cũ sang dữ liệu có cấu trúc', () => {
  const [certificate] = normalizeCertificates(['IELTS 6.5'], 'PROFILE')
  assert.equal(certificate.name, 'IELTS')
  assert.equal(certificate.score, '6.5')
  assert.equal(certificate.status, CERTIFICATE_STATUS.OFFICIAL)
  assert.equal(certificate.source, 'PROFILE')
})

test('điểm chính thức có trọng số bằng chứng cao hơn điểm dự kiến', () => {
  const official = [{ name: 'IELTS Academic', score: '6.5', status: 'OFFICIAL' }]
  const expected = [{ name: 'IELTS Academic', score: '7.0', status: 'EXPECTED' }]
  assert.ok(certificateEvidenceWeight(official) > certificateEvidenceWeight(expected))
})

test('giữ nguyên nguồn và trạng thái của chứng chỉ có cấu trúc', () => {
  const [certificate] = normalizeCertificates([{ id: 'sat', type: 'SAT', name: 'SAT', score: 1400, status: 'EXPECTED', source: 'ASSESSMENT' }])
  assert.deepEqual(certificate, { id: 'sat', type: 'SAT', name: 'SAT', score: '1400', status: 'EXPECTED', source: 'ASSESSMENT' })
})
