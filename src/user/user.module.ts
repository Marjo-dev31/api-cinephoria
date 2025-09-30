import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from 'src/config/database.module';
import { userProviders } from './user.providers';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        DatabaseModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService): JwtModuleOptions => ({
                secret:
                    configService.get<string>('SECRET_TOKEN') ??
                    'default_secret',
                signOptions: {
                    expiresIn: '3h',
                },
            }),
        }),
    ],
    controllers: [UserController],
    providers: [...userProviders, UserService],
})
export class UserModule {}
