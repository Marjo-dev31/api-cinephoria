import { Test, TestingModule } from '@nestjs/testing';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
import { REVIEW_REPOSITORY } from './constants';

describe('ReviewsController', () => {
    let controller: ReviewsController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ReviewsController],
            providers: [
                ReviewsService,
                { provide: REVIEW_REPOSITORY, useValue: 'REVIEW_REPOSITORY' },
            ],
        }).compile();

        controller = module.get<ReviewsController>(ReviewsController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
