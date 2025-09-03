import { Module } from '@nestjs/common';
import { ProjectionQualityService } from './projection-quality.service';

@Module({
  providers: [ProjectionQualityService]
})
export class ProjectionQualityModule {}
