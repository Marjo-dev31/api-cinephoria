import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { ConfigModule } from '@nestjs/config';
import { mongoProviders } from './mongo.providers';

@Module({
    imports: [ConfigModule],
    providers: [...databaseProviders, ...mongoProviders],
    exports: [...databaseProviders, ...mongoProviders],
})
export class DatabaseModule {}
