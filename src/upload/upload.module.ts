import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UserModule } from '../user/user.module';
import { s3Providers } from '../config/s3.providers';

@Module({
    imports: [UserModule],
    controllers: [UploadController],
    providers: [...s3Providers],
})
export class UploadModule {}
