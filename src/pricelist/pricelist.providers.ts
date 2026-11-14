import { DataSource } from 'typeorm';
import { PRICE_REPOSITORY } from './constants';
import { Price } from './entities/price.entity';

export const priceProviders = [
    {
        provide: PRICE_REPOSITORY,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Price),
        inject: ['DATA_SOURCE'],
    },
];
