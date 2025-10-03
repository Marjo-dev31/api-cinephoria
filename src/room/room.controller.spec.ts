import { Test, TestingModule } from '@nestjs/testing';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { ROOM_REPOSITORY } from './constants';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

describe('RoomController', () => {
    let controller: RoomController;
    const mockJwtService: Partial<JwtService> = {};
    const mockConfigService: Partial<ConfigService> = {
        get: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [RoomController],
            providers: [
                RoomService,
                { provide: ROOM_REPOSITORY, useValue: 'ROOM_REPOSITORY' },
                { provide: JwtService, useValue: mockJwtService as JwtService },
                {
                    provide: ConfigService,
                    useValue: mockConfigService as ConfigService,
                },
            ],
        }).compile();

        controller = module.get<RoomController>(RoomController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
