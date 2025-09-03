import { Test, TestingModule } from '@nestjs/testing';
import { ProjectionQualityController } from './projection-quality.controller';

describe('ProjectionQualityController', () => {
  let controller: ProjectionQualityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectionQualityController],
    }).compile();

    controller = module.get<ProjectionQualityController>(ProjectionQualityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
