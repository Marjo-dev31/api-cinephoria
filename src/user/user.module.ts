/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from 'src/config/database.module';
import { userProviders } from './user.providers';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthGuard } from './auth.guard';
import { fetchSecrets } from 'src/helpers/fetch-secrets';

@Module({
    imports: [
        DatabaseModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (): Promise<JwtModuleOptions> => {
                const secrets = await fetchSecrets('prod-jodb');
                const SECRET_TOKEN = secrets.SECRET_TOKEN;

                return {
                    secret: SECRET_TOKEN,
                    signOptions: {
                        expiresIn: '3h',
                    },
                };
            },
        }),
    ],
    controllers: [UserController],
    providers: [...userProviders, UserService, AuthGuard],
    exports: [AuthGuard, JwtModule],
})
export class UserModule {}
