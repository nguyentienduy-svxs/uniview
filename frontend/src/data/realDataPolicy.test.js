import assert from 'node:assert/strict'
import { test } from 'node:test'
import { readFileSync, readdirSync } from 'node:fs'
import { realPagePolicy } from './realDataPolicy.js'

test('every page directly importing example catalog/report/roadmap data has a real-mode policy', () => {
  const root = new URL('../pages/', import.meta.url)
  for (const name of readdirSync(root).filter((name) => name.endsWith('Page.jsx'))) {
    const source = readFileSync(new URL(name, root), 'utf8')
    if (!/from ['"]\.\.\/data\/(?:majors\.json|universities\.json|majorDetails\.json|annualDemo|careerReport|decisionBoard)['"]/.test(source)) continue
    if (['MajorsPage.jsx', 'UniversitiesPage.jsx'].includes(name)) {
      assert.match(source, /useCatalog\(/)
    } else {
      assert.ok(realPagePolicy(name.replace('.jsx', '')), `${name} must not expose sample records in API mode`)
    }
  }
})

test('catalog detail routes use API records while unsupported workflows stay unavailable', () => {
  assert.deepEqual(realPagePolicy('MajorDetailPage'), { kind: 'majors', detail: true })
  assert.deepEqual(realPagePolicy('UitUniversityPage'), { kind: 'universities', detail: true })
  for (const component of ['SchoolRecommendationsPage', 'ReportPdfPage', 'TaskWorkspacePage']) {
    assert.deepEqual(realPagePolicy(component), { unavailable: true })
  }
  assert.equal(realPagePolicy('LandingPage'), null)
})

test('comparison tools keep their own forms and inline empty states in real mode', () => {
  for (const component of ['UniversityComparisonPage', 'AdmissionCheckerPage', 'ScenarioComparisonPage', 'AdmissionRoadmapPage', 'AdmissionRouteMappingPage']) {
    assert.deepEqual(realPagePolicy(component), { inline: true })
  }
})
