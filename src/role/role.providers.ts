import { DataSource } from 'typeorm';
import { ROLE_REPOSITORY } from './constants';
import { Role } from './entities/role.entity';

export const roleProviders = [
    {
        provide: ROLE_REPOSITORY,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Role),
        inject: ['DATA_SOURCE'],
    },
];
