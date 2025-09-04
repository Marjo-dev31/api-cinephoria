import { Test, TestingModule } from '@nestjs/testing';
import { ProjectionQualityController } from './projection-quality.controller';
import { PROJECTION_QUALITY_REPOSITORY } from './constants';
import { ProjectionQualityService } from './projection-quality.service';

describe('ProjectionQualityController', () => {
    let controller: ProjectionQualityController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ProjectionQualityController],
            providers: [
                ProjectionQualityService,
                {
                    provide: PROJECTION_QUALITY_REPOSITORY,
                    useValue: 'PROJECTION_QUALITY_REPOSITORY',
                },
            ],
        }).compile();

        controller = module.get<ProjectionQualityController>(
            ProjectionQualityController,
        );
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
