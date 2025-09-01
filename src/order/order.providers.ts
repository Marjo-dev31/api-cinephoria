import { DataSource } from 'typeorm';
import { Order } from './entities/order.entity';
import { ORDER_REPOSITORY } from './constants';

export const orderProviders = [
    {
        provide: ORDER_REPOSITORY,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Order),
        inject: ['DATA_SOURCE'],
    },
];
