import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { ConfigModule } from '@nestjs/config';
import { dynamoDbProviders } from './dynamodb.providers';

@Module({
    imports: [ConfigModule],
    providers: [...databaseProviders, ...dynamoDbProviders],
    exports: [...databaseProviders, ...dynamoDbProviders],
})
export class DatabaseModule {
    constructor() {
        console.log('moduleinit');
    }
}
