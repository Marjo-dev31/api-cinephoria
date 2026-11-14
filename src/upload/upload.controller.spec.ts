import { Test, TestingModule } from '@nestjs/testing';
import { UploadController } from './upload.controller';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { S3_CLIENT } from '../config/s3.providers';

describe('UploadController', () => {
    let controller: UploadController;
    const mockJwtService: Partial<JwtService> = {};
    const mockConfigService: Partial<ConfigService> = {
        get: jest.fn(),
    };
    const mockS3Client = { send: jest.fn() };
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UploadController],
            providers: [
                { provide: JwtService, useValue: mockJwtService as JwtService },
                {
                    provide: ConfigService,
                    useValue: mockConfigService as ConfigService,
                },
                { provide: S3_CLIENT, useValue: mockS3Client },
            ],
        }).compile();

        controller = module.get<UploadController>(UploadController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
