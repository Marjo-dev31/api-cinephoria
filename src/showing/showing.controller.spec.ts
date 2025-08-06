import { Test, TestingModule } from '@nestjs/testing';
import { ShowingController } from './showing.controller';
import { ShowingService } from './showing.service';
import { SHOWING_REPOSITORY } from './constants';

describe('ShowingController', () => {
    let controller: ShowingController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ShowingController],
            providers: [
                ShowingService,
                { provide: SHOWING_REPOSITORY, useValue: 'SHOWING_REPOSITORY' },
            ],
        }).compile();

        controller = module.get<ShowingController>(ShowingController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
