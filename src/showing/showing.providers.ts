import { DataSource } from 'typeorm';
import { SHOWING_REPOSITORY } from './constants';
import { Showing } from './entities/showing.entity';

export const showingProviders = [
    {
        provide: SHOWING_REPOSITORY,
        useFactory: (dataSource: DataSource) =>
            dataSource.getRepository(Showing),
        inject: ['DATA_SOURCE'],
    },
];
