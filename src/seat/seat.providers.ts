import { DataSource } from 'typeorm';
import { SEAT_REPOSITORY } from './constants';
import { Seat } from './entities/seat.entity';

export const seatProviders = [
    {
        provide: SEAT_REPOSITORY,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Seat),
        inject: ['DATA_SOURCE'],
    },
];
