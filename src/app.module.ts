import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './config/database.module';
import { MoviesModule } from './movies/movies.module';
import { UploadController } from './upload/upload.controller';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        DatabaseModule,
        MoviesModule,
    ],
    controllers: [AppController, UploadController],
    providers: [AppService],
})
export class AppModule {}
