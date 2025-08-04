import { Test, TestingModule } from '@nestjs/testing';
import { CinemaController } from './cinema.controller';
import { CinemaService } from './cinema.service';
import { CINEMA_REPOSITORY } from './constants';

describe('CinemaController', () => {
    let controller: CinemaController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [CinemaController],
            providers: [
                CinemaService,
                { provide: CINEMA_REPOSITORY, useValue: 'CINEMA_REPOSITORY' },
            ],
        }).compile();

        controller = module.get<CinemaController>(CinemaController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
