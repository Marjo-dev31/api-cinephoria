import { Module } from '@nestjs/common';
import { ProjectionQualityService } from './projection-quality.service';
import { DatabaseModule } from '../config/database.module';
import { projectionQualityProviders } from './projection-quality.providers';
import { ProjectionQualityController } from './projection-quality.controller';

@Module({
    imports: [DatabaseModule],
    providers: [...projectionQualityProviders, ProjectionQualityService],
    controllers: [ProjectionQualityController],
})
export class ProjectionQualityModule {}
