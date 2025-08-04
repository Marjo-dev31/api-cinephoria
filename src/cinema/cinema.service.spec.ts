import { Test, TestingModule } from '@nestjs/testing';
import { CinemaService } from './cinema.service';
import { CINEMA_REPOSITORY } from './constants';

describe('CinemaService', () => {
    let service: CinemaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CinemaService,
                { provide: CINEMA_REPOSITORY, useValue: 'CINEMA_REPOSITORY' },
            ],
        }).compile();

        service = module.get<CinemaService>(CinemaService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
