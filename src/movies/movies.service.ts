import { Inject, Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { MovieDto, UpdateMovieDto } from './dto/update-movie.dto';
import { MOVIE_MONGO_REPOSITORY, MOVIE_REPOSITORY } from './constants';
import { Repository } from 'typeorm';
import { Movie } from './entities/movie.entity';
import { MovieMongo } from './entities/movie.mongo';

@Injectable()
export class MoviesService {
    constructor(
        @Inject(MOVIE_REPOSITORY)
        private movieRepository: Repository<Movie>,
        @Inject(MOVIE_MONGO_REPOSITORY)
        private movieMongoRepository: Repository<MovieMongo>,
    ) {}

    async create(createMovieDto: CreateMovieDto) {
        const newMovie = this.movieRepository.create(createMovieDto);
        return await this.movieRepository.save(newMovie);
    }

    async findAll(): Promise<MovieDto[]> {
        return await this.movieRepository.find({
            relations: {
                genre: true,
                reviews: true,
                showing: {
                    room: { cinema: true },
                },
            },
        });
    }

    async findAllSales() {
        return await this.movieMongoRepository.find();
    }

    async findOne(id: string): Promise<MovieDto | null> {
        return await this.movieRepository.findOne({
            relations: {
                showing: {
                    room: { projectionQuality: { price: true } },
                    seat: true,
                },
            },
            where: { id },
        });
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
                genre: updateMovieDto.genre,
            },
        );
    }

    async remove(id: string) {
        return await this.movieRepository.delete({ id });
    }

    async isFavorite(id: string, isFavorite: boolean) {
        return await this.movieRepository.update(
            { id },
            {
                is_Favorite: isFavorite,
            },
        );
    }
}
