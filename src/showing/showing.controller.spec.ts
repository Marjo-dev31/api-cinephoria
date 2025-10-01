import { Test, TestingModule } from '@nestjs/testing';
import { ShowingController } from './showing.controller';
import { ShowingService } from './showing.service';
import { SHOWING_REPOSITORY } from './constants';
import { DataSource } from 'typeorm';

describe('ShowingController', () => {
    let controller: ShowingController;
    let mockDataSource: Partial<DataSource>;

    beforeEach(async () => {
        mockDataSource = {
            createQueryRunner: jest.fn(),
        };
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ShowingController],
            providers: [
                ShowingService,
                { provide: SHOWING_REPOSITORY, useValue: 'SHOWING_REPOSITORY' },
                { provide: 'DATA_SOURCE', useValue: mockDataSource },
            ],
        }).compile();

        controller = module.get<ShowingController>(ShowingController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
