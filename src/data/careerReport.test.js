import assert from 'node:assert/strict'
import test from 'node:test'

import { ANNUAL_DEMO_MAJORS, ANNUAL_DEMO_TASKS } from './annualDemo.js'
import { CAREER_REPORT_GROUPS, CAREER_REPORT_MAJORS, getProfileCompleteness, getRecommendedUniversities } from './careerReport.js'

test('catalog báo cáo có đúng 6 nhóm, mỗi nhóm 3 ngành và không trùng ID', () => {
  assert.equal(CAREER_REPORT_GROUPS.length, 6)
  assert.ok(CAREER_REPORT_GROUPS.every(({ majors }) => majors.length === 3))
  assert.equal(CAREER_REPORT_MAJORS.length, 18)
  assert.equal(new Set(CAREER_REPORT_MAJORS.map(({ id }) => id)).size, 18)
})

test('Roadmap có vòng đầu 3 task cho mỗi ngành và task tiếp nối cho Software Engineering/Marketing', () => {
  assert.equal(ANNUAL_DEMO_MAJORS.length, 18)
  assert.ok(ANNUAL_DEMO_MAJORS.every(({ tasks }) => tasks.length >= 3))
  assert.ok(ANNUAL_DEMO_MAJORS.every(({ tasks }) => tasks.slice(0, 3).length === 3))
  assert.equal(ANNUAL_DEMO_MAJORS.find(({ id }) => id === 'information-technology').tasks.length, 7)
  assert.equal(ANNUAL_DEMO_MAJORS.find(({ id }) => id === 'marketing').tasks.length, 5)
  assert.equal(ANNUAL_DEMO_TASKS.length, 60)
  assert.equal(new Set(ANNUAL_DEMO_TASKS.map(({ id }) => id)).size, 60)
})

test('task Marketing và Tài chính có bài mẫu đủ nối tới report; bài mẫu Tài chính tạo tín hiệu hạ ưu tiên', () => {
  for (const majorId of ['marketing', 'finance']) {
    const initialTasks = ANNUAL_DEMO_MAJORS.find(({ id }) => id === majorId).tasks.slice(0, 3)
    assert.ok(initialTasks.every(({ demoAnswer }) => demoAnswer?.draft.length > 80))
    assert.ok(initialTasks.every(({ demoAnswer }) => demoAnswer?.evidenceText && demoAnswer?.evidenceExplanation))
  }

  const financeTasks = ANNUAL_DEMO_MAJORS.find(({ id }) => id === 'finance').tasks.slice(0, 3)
  assert.ok(financeTasks.every(({ demoAnswer }) => demoAnswer.reflection.interest <= 2))
  assert.ok(financeTasks.every(({ demoAnswer }) => demoAnswer.reflection.wantsRetry === false))
})

test('mọi ngành đều có phân tích riêng và ít nhất một gợi ý trường demo', () => {
  for (const major of CAREER_REPORT_MAJORS) {
    assert.ok(major.learn)
    assert.ok(major.work)
    assert.ok(major.fit)
    assert.ok(major.tradeoff)
    assert.ok(major.evidenceGap)
    assert.ok(getRecommendedUniversities(major.id).length > 0, major.name)
  }
})

test('thiếu điểm được giữ là chưa có dữ liệu thay vì quy thành 0', () => {
  const [school] = getRecommendedUniversities('information-technology', {
    regions: ['TP.HCM'],
    gpa: '',
    thptScore: '',
    dgnlScore: '',
  })
  assert.match(school.criteria.admission, /Chưa có điểm đầu vào/)
  assert.match(school.criteria.admission, /không quy đổi thành 0/)
})

test('độ đầy đủ hồ sơ chỉ ghi nhận nhóm điểm khi thật sự có dữ liệu', () => {
  const emptyScores = getProfileCompleteness({ regions: ['TP.HCM'], tuition: '25-45', strengths: ['Toán'] }, 30)
  const withScore = getProfileCompleteness({ regions: ['TP.HCM'], tuition: '25-45', strengths: ['Toán'], gpa: '8.5' }, 30)
  assert.ok(emptyScores.missing.includes('Ít nhất một loại điểm'))
  assert.ok(withScore.percent > emptyScores.percent)
})
