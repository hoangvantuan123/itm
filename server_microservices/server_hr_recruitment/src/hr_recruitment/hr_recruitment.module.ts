import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/database.module';
import { Personnel } from './entity/personnel.entity';
import { HrRecruitmentController } from './controller/hr_recruitment.controller';
import { HrRecruitmentServices } from './services/hr_recruitment.services';
import { InterviewResult } from './entity/interview_results.entity';
import { HrInterviewServices } from './services/hr_interview.services';
import { HrInterviewController } from './controller/hr_interview.controller';
import { HrInterviewCandidate } from './entity/hr_interview_candidates.entity';
import { HrInterviewCandidatesController } from './controller/hr_interview_candidate.controller';
import { HrInterviewCandidatesService } from './services/hr_interview_candidate.services';
import { HrAllDataService } from './services/hr_all_data.services';
import { HrAllDataController } from './controller/hr_all_data.services.controller';
import { HrInterServices } from './services/hr_inter.services';
import { HrInter } from './entity/hr_inter.entity';
import { HrInerController } from './controller/hr_inter.controller';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([ Personnel , InterviewResult , HrInterviewCandidate, HrInter]),
   
  ],
  providers: [HrRecruitmentServices, HrInterviewServices, HrInterviewCandidatesService, HrAllDataService, HrInterServices],
  controllers: [HrRecruitmentController, HrInterviewController, HrInterviewCandidatesController, HrAllDataController, HrInerController],
  exports: [],
})
export class HrRecruitment { }
