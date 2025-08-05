import { Inject, Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';
import { ROOM_REPOSITORY } from './constants';
import { Room } from './entities/room.entity';
// import { UpdateRoomDto } from './dto/update-room.dto';

@Injectable()
export class RoomService {
    constructor(
        @Inject(ROOM_REPOSITORY) private roomRepository: Repository<Room>,
    ) {}

    // create(createSeatDto: CreateSeatDto) {
    //     return 'This action adds a new seat';
    // }

    async findAll() {
        return await this.roomRepository.find();
    }

    // findOne(id: string) {
    //     return `This action returns a #${id} seat`;
    // }

    async updateNumberOfSales(id: string, reservation: number) {
        return await this.roomRepository.decrement(
            { id },
            'numberOfSeats',
            reservation,
        );
    }

    async remove(id: string) {
        return await this.roomRepository.delete({ id });
    }
}
