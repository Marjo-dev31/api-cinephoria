import { DataSource } from 'typeorm';
import { REVIEW_REPOSITORY } from './constants';
import { Review } from './entities/review.entity';

export const reviewProviders = [
    {
        provide: REVIEW_REPOSITORY,
        useFactory: (dataSource: DataSource) =>
            dataSource.getRepository(Review),
        inject: ['DATA_SOURCE'],
    },
];
