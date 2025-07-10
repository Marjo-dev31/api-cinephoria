import { DataSource } from 'typeorm';
import { Genre } from './entities/genre.entity';
import { GENRE_REPOSITORY } from './constants';

export const genreProviders = [
    {
        provide: GENRE_REPOSITORY,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Genre),
        inject: ['DATA_SOURCE'],
    },
];
