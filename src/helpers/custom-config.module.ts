import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import secretManagerConfig from './secret-manager.config';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [secretManagerConfig],
            isGlobal: true,
            // envFilePath: `.env.${process.env.NODE_ENV}`,
        }),
    ],
})
export class CustomConfigModule {}
