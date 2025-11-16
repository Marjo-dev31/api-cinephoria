/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ConfigService } from '@nestjs/config';
import { fetchSecrets } from 'src/helpers/fetch-secrets';
import { DataSource } from 'typeorm';

export const mongoProviders = [
    {
        provide: 'MONGO_DATA_SOURCE',
        useFactory: async () => {
            const secrets = await fetchSecrets('prod-jodb');
            // const secrets = configService.get('mongo');
            const dataSource = new DataSource({
                name: 'mongoDb',
                type: 'mongodb',
                url: secrets.MONGO_URI,
                database: secrets.MONGO_DB,
                password: secrets.MONGO_PASSWORD,
                username: secrets.MONGO_USERNAME,
                entities: [__dirname + '/../**/*.mongo{.ts,.js}'],
                // make sure is false in production
                synchronize: true,
            });
            return await dataSource.initialize();
        },
        inject: [ConfigService],
    },
];
