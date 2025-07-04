import { Inject, Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MOVIE_REPOSITORY } from './constants';
import { Repository } from 'typeorm';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
    constructor(
        @Inject(MOVIE_REPOSITORY)
        private movieRepository: Repository<Movie>,
    ) {}

    async create(createMovieDto: CreateMovieDto) {
        const newMovie = this.movieRepository.create(createMovieDto);
        return await this.movieRepository.save(newMovie);
    }

    async findAll(): Promise<Movie[]> {
        return await this.movieRepository.find();
    }

    async findOne(id: string): Promise<Movie | null> {
        return await this.movieRepository.findOne({ where: { id } });
    }

    async update(id: string, updateMovieDto: UpdateMovieDto) {
        return await this.movieRepository.update(
            { id },
            {
                title: updateMovieDto.title,
                description: updateMovieDto.description,
                image_Url: updateMovieDto.image_Url,
                minimun_Age: updateMovieDto.minimun_Age,
                is_Favorite: updateMovieDto.is_Favorite,
            },
        );
    }

    async remove(id: string) {
        return await this.movieRepository.delete({ id });
    }
}
