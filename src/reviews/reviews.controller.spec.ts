import { Test, TestingModule } from '@nestjs/testing';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
import { REVIEW_REPOSITORY } from './constants';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

describe('ReviewsController', () => {
    let controller: ReviewsController;
    const mockJwtService: Partial<JwtService> = {};
    const mockConfigService: Partial<ConfigService> = {
        get: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ReviewsController],
            providers: [
                ReviewsService,
                { provide: REVIEW_REPOSITORY, useValue: 'REVIEW_REPOSITORY' },
                { provide: JwtService, useValue: mockJwtService as JwtService },
                {
                    provide: ConfigService,
                    useValue: mockConfigService as ConfigService,
                },
            ],
        }).compile();

        controller = module.get<ReviewsController>(ReviewsController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
