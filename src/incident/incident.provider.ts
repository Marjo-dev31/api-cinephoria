import { DataSource } from 'typeorm';
import { Incident } from './entities/incident.entity';
import { INCIDENT_REPOSITORY } from './constants';

export const IncidentProviders = [
    {
        provide: INCIDENT_REPOSITORY,
        useFactory: (dataSource: DataSource) =>
            dataSource.getRepository(Incident),
        inject: ['DATA_SOURCE'],
    },
];
