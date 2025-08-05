import { Test, TestingModule } from '@nestjs/testing';
import { SeatService } from './seat.service';
import { SEAT_REPOSITORY } from './constants';

describe('SeatService', () => {
    let service: SeatService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                SeatService,
                { provide: SEAT_REPOSITORY, useValue: 'SEAT_REPOSITORY' },
            ],
        }).compile();

        service = module.get<SeatService>(SeatService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
