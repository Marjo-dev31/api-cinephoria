import { Inject, Injectable } from '@nestjs/common';
import { CreateCinemaDto } from './dto/create-cinema.dto';
import { UpdateCinemaDto } from './dto/update-cinema.dto';
import { CINEMA_REPOSITORY } from './constants';
import { Repository } from 'typeorm';
import { Cinema } from './entities/cinema.entity';

@Injectable()
export class CinemaService {
    constructor(
        @Inject(CINEMA_REPOSITORY)
        private cinemaRepository: Repository<Cinema>,
    ) {}

    async create(createCinemaDto: CreateCinemaDto) {
        const newCinema = this.cinemaRepository.create(createCinemaDto);
        return await this.cinemaRepository.save(newCinema);
    }

    async findAll() {
        return await this.cinemaRepository.find({
            relations: { country: true },
        });
    }

    // findOne(id: string) {
    //     return `This action returns a #${id} cinema`;
    // }

    async update(id: string, updateCinemaDto: UpdateCinemaDto) {
        return await this.cinemaRepository.update(
            { id },
            {
                city: updateCinemaDto.city,
            },
        );
    }

    async remove(id: string) {
        return await this.cinemaRepository.delete({ id });
    }
}
