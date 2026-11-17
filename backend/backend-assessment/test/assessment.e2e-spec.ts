import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request = require('supertest')
import { AppModule } from '../src/app.module'

const BASE = '/api/v1/assessments'

describe('Assessment API (e2e)', () => {
  let app: INestApplication

  beforeAll(async () => {
    const module = await Test.createTestingModule({ imports: [AppModule] }).compile()
    app = module.createNestApplication()
    app.setGlobalPrefix('api/v1')
    await app.init()
  })

  afterAll(async () => app.close())

  it('GET definition returns counts', () =>
    request(app.getHttpServer()).get(`${BASE}/definition`).expect(200)
      .expect(({ body }) => expect(body.counts).toEqual(expect.objectContaining({ riasec: 30, mbti: 60 }))))

  it('GET riasec hides scoring domains', () =>
    request(app.getHttpServer()).get(`${BASE}/riasec`).expect(200)
      .expect(({ body }) => { expect(body.questions).toHaveLength(30); expect(body.questions[0].domain).toBeUndefined() }))

  it('GET mbti returns 60 questions', () =>
    request(app.getHttpServer()).get(`${BASE}/mbti`).expect(200)
      .expect(({ body }) => expect(body.questions).toHaveLength(60)))

  it('GET experience-domains returns eight', () =>
    request(app.getHttpServer()).get(`${BASE}/experience-domains`).expect(200)
      .expect(({ body }) => expect(body).toHaveLength(8)))

  it('GET experience-domains/:domain returns its adaptive question bank', () =>
    request(app.getHttpServer()).get(`${BASE}/experience-domains/TECHNOLOGY`).expect(200)
      .expect(({ body }) => {
        expect(body.domain).toBe('TECHNOLOGY')
        expect(body.baseQuestions).toHaveLength(5)
        expect(body.adaptiveQuestionBank.realityCheckQuestions).toHaveLength(3)
        expect(body.adaptiveQuestionBank.realityCheckQuestions.every(({ id }: { id: string }) => id.startsWith('TECH-'))).toBe(true)
      }))

  it('POST evaluate-base selects the reality-check branch', () =>
    request(app.getHttpServer()).post(`${BASE}/experience-domains/TECHNOLOGY/evaluate-base`).send({
      baseAnswers: { recency: 'LAST_3_MONTHS', frequency: 'OCCASIONAL', voluntaryLevel: 'VOLUNTARY', role: 'CONTRIBUTOR', outcome: 'PERSONAL_PRODUCT' },
    }).expect(201).expect(({ body }) => {
      expect(body.baseEvidenceScore).toBe(70)
      expect(body.nextBranch).toBe('REALITY_CHECK')
      expect(body.nextQuestions).toHaveLength(3)
    }))

  it('POST evaluate-adaptive keeps an artifact unverified', () =>
    request(app.getHttpServer()).post(`${BASE}/experience-domains/TECHNOLOGY/evaluate-adaptive`).send({
      baseEvidenceScore: 70,
      artifactUrl: 'https://example.test/work',
      adaptiveAnswers: [
        { questionId: 'TECH-R01', optionId: 'TRACE' },
        { questionId: 'TECH-R02', optionId: 'ACCEPT' },
        { questionId: 'TECH-R03', optionId: 'CLARIFY' },
      ],
    }).expect(201).expect(({ body }) => {
      expect(body.verificationStatus).toBe('ARTIFACT_PROVIDED_UNVERIFIED')
      expect(body.finalEvidenceScore).toBeGreaterThan(70)
    }))

  it('GET unknown domain returns 404 with code', () =>
    request(app.getHttpServer()).get(`${BASE}/experience-domains/unknown`).expect(404)
      .expect(({ body }) => expect(body.code).toBe('EXPERIENCE_DOMAIN_NOT_FOUND')))

  it('GET demo-personas returns four', () =>
    request(app.getHttpServer()).get(`${BASE}/demo-personas`).expect(200)
      .expect(({ body }) => expect(body).toHaveLength(4)))

  it('POST evaluate-demo creates a six-major report', () =>
    request(app.getHttpServer()).post(`${BASE}/evaluate-demo/duy-tech`).expect(201)
      .expect(({ body }) => expect(body.majors).toHaveLength(6)))

  it('POST unknown persona returns 404 with code', () =>
    request(app.getHttpServer()).post(`${BASE}/evaluate-demo/unknown`).expect(404)
      .expect(({ body }) => expect(body.code).toBe('DEMO_PERSONA_NOT_FOUND')))

  it('POST evaluate with empty body returns structured 400', () =>
    request(app.getHttpServer()).post(`${BASE}/evaluate`).send({}).expect(400)
      .expect(({ body }) => expect(body.code).toBe('ASSESSMENT_VALIDATION_FAILED')))
})

