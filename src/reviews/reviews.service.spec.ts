import { Test, TestingModule } from '@nestjs/testing';
import { ReviewsService } from './reviews.service';
import { REVIEW_REPOSITORY } from './constants';

describe('ReviewsService', () => {
    let service: ReviewsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ReviewsService,
                { provide: REVIEW_REPOSITORY, useValue: 'REVIEW_REPOSITORY' },
            ],
        }).compile();

        service = module.get<ReviewsService>(ReviewsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
