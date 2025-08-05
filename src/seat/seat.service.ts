import { Inject, Injectable } from '@nestjs/common';
// import { CreateSeatDto } from './dto/create-seat.dto';
import { UpdateSeatDto } from './dto/update-seat.dto';
import { SEAT_REPOSITORY } from './constants';
import { Repository } from 'typeorm';
import { Seat } from './entities/seat.entity';

@Injectable()
export class SeatService {
    constructor(
        @Inject(SEAT_REPOSITORY) private seatRepository: Repository<Seat>,
    ) {}

    // create(createSeatDto: CreateSeatDto) {
    //     return 'This action adds a new seat';
    // }

    async findAll() {
        return await this.seatRepository.find();
    }

    // findOne(id: string) {
    //     return `This action returns a #${id} seat`;
    // }

    async update(id: string, updateSeatDto: UpdateSeatDto) {
        return await this.seatRepository.update(
            { id },
            {
                reserved: updateSeatDto.reserved,
            },
        );
    }

    async remove(id: string) {
        return await this.seatRepository.delete({ id });
    }
}
