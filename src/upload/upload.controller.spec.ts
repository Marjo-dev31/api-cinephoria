import { Test, TestingModule } from '@nestjs/testing';
import { UploadController } from './upload.controller';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

describe('UploadController', () => {
    let controller: UploadController;
    const mockJwtService: Partial<JwtService> = {};
    const mockConfigService: Partial<ConfigService> = {
        get: jest.fn(),
    };
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UploadController],
            providers: [
                { provide: JwtService, useValue: mockJwtService as JwtService },
                {
                    provide: ConfigService,
                    useValue: mockConfigService as ConfigService,
                },
            ],
        }).compile();

        controller = module.get<UploadController>(UploadController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
