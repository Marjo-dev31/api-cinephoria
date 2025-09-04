import { Test, TestingModule } from '@nestjs/testing';
import { ProjectionQualityService } from './projection-quality.service';
import { PROJECTION_QUALITY_REPOSITORY } from './constants';

describe('ProjectionQualityService', () => {
    let service: ProjectionQualityService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ProjectionQualityService,
                {
                    provide: PROJECTION_QUALITY_REPOSITORY,
                    useValue: 'PROJECTION_QUALITY_REPOSITORY',
                },
            ],
        }).compile();

        service = module.get<ProjectionQualityService>(
            ProjectionQualityService,
        );
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
