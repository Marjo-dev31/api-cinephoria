/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ConfigService } from '@nestjs/config';
// import { fetchSecrets } from 'src/helpers/fetch-secrets';
import { DataSource } from 'typeorm';

export const databaseProviders = [
    {
        provide: 'DATA_SOURCE',
        useFactory: async (configService: ConfigService) => {
            // const secrets = await fetchSecrets('prod-jodb');
            const secrets = configService.get('databaseMySql');
            const dataSource = new DataSource({
                name: 'mysqlDb',
                type: 'mysql',
                host: secrets.host,
                port: +secrets.port,
                username: secrets.user,
                password: secrets.password,
                database: secrets.name,
                entities: [__dirname + '/../**/*.entity{.ts,.js}'],
                // make sure is false in production
                synchronize: false,
            });

            return await dataSource.initialize();
        },
        inject: [ConfigService],
    },
];
