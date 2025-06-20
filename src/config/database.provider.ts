import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

export const databaseProviders = [
    {
        provide: 'DATA_SOURCE',
        useFactory: async (configService: ConfigService) => {
            const dataSource = new DataSource({
                type: 'mysql',
                host: configService.getOrThrow('MYSQL_DB_HOST'),
                port: configService.getOrThrow('MYSQL_DB_PORT'),
                username: configService.getOrThrow('MYSQL_DB_USERNAME'),
                password: configService.getOrThrow('MYSQL_DB_PASSWORD'),
                database: configService.getOrThrow('MYSQL_DB_DATABASE'),
                entities: [__dirname + '/../**/*.entity{.ts,.js}'],
                // make sure is false in production
                synchronize: true,
            });

            return dataSource.initialize();
        },
        inject: [ConfigService],
    },
];
