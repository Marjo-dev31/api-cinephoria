import { Test, TestingModule } from '@nestjs/testing';
import { ShowingService } from './showing.service';
import { SHOWING_REPOSITORY } from './constants';

describe('ShowingService', () => {
    let service: ShowingService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ShowingService,
                { provide: SHOWING_REPOSITORY, useValue: 'SHOWING_REPOSITORY' },
            ],
        }).compile();

        service = module.get<ShowingService>(ShowingService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
