import { Test, TestingModule } from '@nestjs/testing';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { ROOM_REPOSITORY } from './constants';

describe('RoomController', () => {
    let controller: RoomController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [RoomController],
            providers: [
                RoomService,
                { provide: ROOM_REPOSITORY, useValue: 'ROOM_REPOSITORY' },
            ],
        }).compile();

        controller = module.get<RoomController>(RoomController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
