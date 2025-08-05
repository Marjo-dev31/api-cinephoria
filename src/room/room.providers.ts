import { DataSource } from 'typeorm';
import { ROOM_REPOSITORY } from './constants';
import { Room } from './entities/room.entity';

export const roomProviders = [
    {
        provide: ROOM_REPOSITORY,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Room),
        inject: ['DATA_SOURCE'],
    },
];
