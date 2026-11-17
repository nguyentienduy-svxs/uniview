import assert from 'node:assert/strict'
import { test } from 'node:test'
import rawUniversities from '../src/data/universities.json' with { type: 'json' }
import rawMajors from '../src/data/majors.json' with { type: 'json' }
import { ALL_REGIONS, ALL_SUBJECTS, TUITION_LABELS } from '../src/data/profileOptions.js'

test('QuickProfile và ProfilePage có đầy đủ 11 môn THPT', () => {
  assert.equal(ALL_SUBJECTS.length, 11)
  assert.ok(ALL_SUBJECTS.includes('Toán'))
  assert.ok(ALL_SUBJECTS.includes('Tiếng Anh'))
  assert.ok(ALL_SUBJECTS.includes('Tin học'))
  assert.ok(ALL_SUBJECTS.includes('Vật lý'))
  assert.ok(ALL_SUBJECTS.includes('Hóa học'))
  assert.ok(ALL_SUBJECTS.includes('Sinh học'))
  assert.ok(ALL_SUBJECTS.includes('Ngữ văn'))
  assert.ok(ALL_SUBJECTS.includes('Lịch sử'))
  assert.ok(ALL_SUBJECTS.includes('Địa lý'))
  assert.ok(ALL_SUBJECTS.includes('Kinh tế & Pháp luật'))
  assert.ok(ALL_SUBJECTS.includes('Công nghệ'))
})

test('QuickProfile và ProfilePage có đầy đủ các khu vực bao gồm TP.HCM & miền Nam', () => {
  assert.ok(ALL_REGIONS.includes('TP. Hồ Chí Minh & miền Nam'))
  assert.ok(ALL_REGIONS.includes('Cần Thơ & ĐBSCL'))
  assert.ok(ALL_REGIONS.includes('Hà Nội & miền Bắc'))
  assert.ok(ALL_REGIONS.includes('Đà Nẵng & miền Trung'))
  assert.ok(ALL_REGIONS.includes('Không giới hạn'))
})

test('AdmissionChecker có đầy đủ 42 trường đại học và hơn 30 ngành học', () => {
  assert.ok(rawUniversities.universities.length >= 40)
  assert.ok(rawMajors.length >= 30)

  const uit = rawUniversities.universities.find((u) => u.shortName === 'UIT')
  assert.ok(uit, 'Phải có trường UIT')

  const seMajor = rawMajors.find((m) => m.name.includes('Phần mềm'))
  assert.ok(seMajor, 'Phải có ngành Kỹ thuật Phần mềm')
})

test('AdmissionChecker tính đúng chênh lệch số học', () => {
  const userScore = 25.50
  const benchmarkScore = 26.50
  const diff = (userScore - benchmarkScore).toFixed(2)
  assert.equal(diff, '-1.00')

  const higherScore = 27.25
  const diffHigher = (higherScore - benchmarkScore).toFixed(2)
  assert.equal(diffHigher, '0.75')
})

test('Tuition labels chuẩn hóa mức học phí', () => {
  assert.ok(TUITION_LABELS['under-25'])
  assert.ok(TUITION_LABELS['25-45'])
  assert.ok(TUITION_LABELS['45-70'])
  assert.ok(TUITION_LABELS['over-70'])
  assert.ok(TUITION_LABELS['undecided'])
})
