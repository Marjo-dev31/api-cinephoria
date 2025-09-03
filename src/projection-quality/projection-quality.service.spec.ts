import { Test, TestingModule } from '@nestjs/testing';
import { ProjectionQualityService } from './projection-quality.service';

describe('ProjectionQualityService', () => {
  let service: ProjectionQualityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectionQualityService],
    }).compile();

    service = module.get<ProjectionQualityService>(ProjectionQualityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
