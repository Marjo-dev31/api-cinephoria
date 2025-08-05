import { Test, TestingModule } from '@nestjs/testing';
import { SeatController } from './seat.controller';
import { SeatService } from './seat.service';
import { SEAT_REPOSITORY } from './constants';

describe('SeatController', () => {
    let controller: SeatController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [SeatController],
            providers: [
                SeatService,
                { provide: SEAT_REPOSITORY, useValue: 'SEAT_REPOSITORY' },
            ],
        }).compile();

        controller = module.get<SeatController>(SeatController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
