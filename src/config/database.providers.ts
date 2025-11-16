/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ConfigService } from '@nestjs/config';
import { fetchSecrets } from 'src/helpers/fetch-secrets';
import { DataSource } from 'typeorm';

export const databaseProviders = [
    {
        provide: 'DATA_SOURCE',
        useFactory: async () => {
            const secrets = await fetchSecrets('prod-jodb');
            // const secrets = configService.get('databaseMySql');
            const dataSource = new DataSource({
                name: 'mysqlDb',
                type: 'mysql',
                host: secrets.MYSQL_DB_HOST,
                port: +secrets.MYSQL_DB_PORT,
                username: secrets.MYSQL_DB_USERNAME,
                password: secrets.MYSQL_DB_PASSWORD,
                database: secrets.MYSQL_DB_DATABASE,
                entities: [__dirname + '/../**/*.entity{.ts,.js}'],
                // make sure is false in production
                synchronize: false,
            });

            return await dataSource.initialize();
        },
        inject: [ConfigService],
    },
];
