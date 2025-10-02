import { DataSource } from 'typeorm';
import { MOVIE_MONGO_REPOSITORY } from './constants';
import { MovieMongo } from './entities/movie.mongo';

export const movieMongoProviders = [
    {
        provide: MOVIE_MONGO_REPOSITORY,
        useFactory: (dataSource: DataSource) =>
            dataSource.getMongoRepository(MovieMongo),
        inject: ['MONGO_DATA_SOURCE'],
    },
];
