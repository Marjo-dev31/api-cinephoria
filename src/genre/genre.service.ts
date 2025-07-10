import { Inject, Injectable } from '@nestjs/common';
import { GENRE_REPOSITORY } from './constants';
import { Repository } from 'typeorm';
import { Genre } from './entities/genre.entity';
import { CreateGenreDto } from './dto/create-genre.dto';

@Injectable()
export class GenreService {
    constructor(
        @Inject(GENRE_REPOSITORY)
        private readonly genreRepository: Repository<Genre>,
    ) {}

    async create(createGenreDto: CreateGenreDto) {
        const newGenre = this.genreRepository.create(createGenreDto);
        return await this.genreRepository.save(newGenre);
    }
}
