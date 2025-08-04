import { DataSource } from 'typeorm';
import { CINEMA_REPOSITORY } from './constants';
import { Cinema } from './entities/cinema.entity';

export const cinemaProviders = [
    {
        provide: CINEMA_REPOSITORY,
        useFactory: (dataSource: DataSource) =>
            dataSource.getRepository(Cinema),
        inject: ['DATA_SOURCE'],
    },
];
