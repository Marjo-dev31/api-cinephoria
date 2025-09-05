import { Inject, Injectable } from '@nestjs/common';
import { CreateShowingDto } from './dto/create-showing.dto';
import { UpdateShowingDto } from './dto/update-showing.dto';
import { Repository } from 'typeorm';
import { Showing } from './entities/showing.entity';

@Injectable()
export class ShowingService {
    constructor(
        @Inject('SHOWING_REPOSITORY')
        private showingRepository: Repository<Showing>,
    ) {}

    async create(createShowingDto: CreateShowingDto) {
        const newShowing = this.showingRepository.create(createShowingDto);
        return await this.showingRepository.save(newShowing);
    }

    async findAll() {
        return await this.showingRepository.find({
            relations: {
                movie: true,
                room: {
                    cinema: true,
                    projectionQuality: { price: true },
                },
                seat: true,
            },
        });
    }

    async findOne(id: string) {
        return await this.showingRepository.findOne({
            relations: {
                room: { cinema: true },
                movie: true,
            },
            where: { id },
        });
    }

    async update(id: string, updateShowingDto: UpdateShowingDto) {
        return await this.showingRepository.update(
            { id },
            {
                date: updateShowingDto.date,
                startAt: updateShowingDto.startAt,
                endAt: updateShowingDto.endAt,
                movie: updateShowingDto.movie,
                room: updateShowingDto.room,
            },
        );
    }

    async remove(id: string) {
        return await this.showingRepository.delete({ id });
    }
}
