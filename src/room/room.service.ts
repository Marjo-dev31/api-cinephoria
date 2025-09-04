import { Inject, Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';
import { ROOM_REPOSITORY } from './constants';
import { Room } from './entities/room.entity';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
// import { UpdateRoomDto } from './dto/update-room.dto';

@Injectable()
export class RoomService {
    constructor(
        @Inject(ROOM_REPOSITORY) private roomRepository: Repository<Room>,
    ) {}

    async create(createRoomDto: CreateRoomDto) {
        const newRoom = this.roomRepository.create(createRoomDto);
        return await this.roomRepository.save(newRoom);
    }

    async findAll() {
        return await this.roomRepository.find({
            relations: {
                cinema: true,
                projectionQuality: true,
            },
        });
    }

    // findOne(id: string) {
    //     return `This action returns a #${id} seat`;
    // }

    async updateRoom(id: string, updateRoom: UpdateRoomDto) {
        return await this.roomRepository.update(
            { id },
            {
                number: updateRoom.number,
                numberOfSeats: updateRoom.numberOfSeats,
                cinema: updateRoom.cinema,
                projectionQuality: updateRoom.projectionQuality,
            },
        );
    }

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
