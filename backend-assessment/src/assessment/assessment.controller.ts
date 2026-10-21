import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { AssessmentService } from './assessment.service'
import { AssessmentInput } from './assessment.types'

@Controller('assessments')
export class AssessmentController {
  constructor(private readonly service: AssessmentService) {}

  @Get('definition')          definition()                                                { return this.service.definition() }
  @Get('riasec')              riasec()                                                    { return this.service.riasec() }
  @Get('mbti')                mbti()                                                      { return this.service.mbti() }
  @Get('experience-domains')  experienceDomains()                                         { return this.service.experienceDomains() }
  @Get('experience-domains/:domain') experienceDomain(@Param('domain') domain: string)   { return this.service.experienceDomain(domain) }
  @Post('experience-domains/:domain/evaluate-base') evaluateExperienceBase(@Param('domain') domain: string, @Body() body: { baseAnswers?: Record<string, string> }) { return this.service.evaluateExperienceBase(domain, body) }
  @Post('experience-domains/:domain/evaluate-adaptive') evaluateExperienceAdaptive(@Param('domain') domain: string, @Body() body: { baseAnswers?: Record<string, string>; baseEvidenceScore?: number; adaptiveAnswers?: Array<{ questionId: string; optionId: string }>; artifactUrl?: string }) { return this.service.evaluateExperienceAdaptive(domain, body) }
  @Post('evaluate')           evaluate(@Body() input: AssessmentInput)                    { return this.service.evaluate(input) }
  @Get('demo-personas')       demoPersonas()                                              { return this.service.demoPersonas() }
  @Post('evaluate-demo/:personaId') evaluateDemo(@Param('personaId') id: string)         { return this.service.evaluateDemo(id) }
}
