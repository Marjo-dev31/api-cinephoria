import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

export const mongoProviders = [
    {
        provide: 'MONGO_DATA_SOURCE',
        useFactory: async (configService: ConfigService) => {
            const dataSource = new DataSource({
                name: 'mongoDb',
                type: 'mongodb',
                url: configService.getOrThrow('MONGO_URI'),
                database: configService.getOrThrow('MONGO_DB'),
                entities: [__dirname + '/../**/*.mongo{.ts,.js}'],
                // make sure is false in production
                synchronize: true,
            });
            return dataSource.initialize();
        },
        inject: [ConfigService],
    },
];
