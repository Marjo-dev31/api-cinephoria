import { DataSource } from 'typeorm';
import { PROJECTION_QUALITY_REPOSITORY } from './constants';
import { ProjectionQuality } from './entities/projection-quality.entity';

export const projectionQualityProviders = [
    {
        provide: PROJECTION_QUALITY_REPOSITORY,
        useFactory: (dataSource: DataSource) =>
            dataSource.getRepository(ProjectionQuality),
        inject: ['DATA_SOURCE'],
    },
];
