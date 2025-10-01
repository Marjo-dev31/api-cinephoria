import { Test, TestingModule } from '@nestjs/testing';
import { ShowingService } from './showing.service';
import { SHOWING_REPOSITORY } from './constants';
import { DataSource } from 'typeorm';

describe('ShowingService', () => {
    let service: ShowingService;
    let mockDataSource: Partial<DataSource>;

    beforeEach(async () => {
        mockDataSource = {
            createQueryRunner: jest.fn(),
        };
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ShowingService,
                { provide: SHOWING_REPOSITORY, useValue: 'SHOWING_REPOSITORY' },
                { provide: 'DATA_SOURCE', useValue: mockDataSource },
            ],
        }).compile();

        service = module.get<ShowingService>(ShowingService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
