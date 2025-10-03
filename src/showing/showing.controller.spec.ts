import { Test, TestingModule } from '@nestjs/testing';
import { ShowingController } from './showing.controller';
import { ShowingService } from './showing.service';
import { SHOWING_REPOSITORY } from './constants';
import { DataSource } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

describe('ShowingController', () => {
    let controller: ShowingController;
    let mockDataSource: Partial<DataSource>;
    const mockJwtService: Partial<JwtService> = {};
    const mockConfigService: Partial<ConfigService> = {
        get: jest.fn(),
    };

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
                { provide: JwtService, useValue: mockJwtService as JwtService },
                {
                    provide: ConfigService,
                    useValue: mockConfigService as ConfigService,
                },
            ],
        }).compile();

        controller = module.get<ShowingController>(ShowingController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
