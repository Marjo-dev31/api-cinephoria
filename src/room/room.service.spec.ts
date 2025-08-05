import { Test, TestingModule } from '@nestjs/testing';
import { RoomService } from './room.service';
import { ROOM_REPOSITORY } from './constants';

describe('RoomService', () => {
    let service: RoomService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                RoomService,
                { provide: ROOM_REPOSITORY, useValue: 'ROOM_REPOSITORY' },
            ],
        }).compile();

        service = module.get<RoomService>(RoomService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
