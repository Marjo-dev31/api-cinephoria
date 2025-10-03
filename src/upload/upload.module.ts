import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { UploadController } from './upload.controller';
import { UserModule } from '../user/user.module';

@Module({
    imports: [
        MulterModule.register({
            dest: './uploads',
        }),
        UserModule,
    ],
    controllers: [UploadController],
    providers: [],
})
export class UploadModule {}
