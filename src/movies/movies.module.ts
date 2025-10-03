import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { DatabaseModule } from '../config/database.module';
import { movieProviders } from './movie.providers';
import { MulterModule } from '@nestjs/platform-express';
import { movieMongoProviders } from './movie.mongo.providers';
import { UserModule } from '../user/user.module';

@Module({
    imports: [
        DatabaseModule,
        MulterModule.register({ dest: './uploads' }),
        UserModule,
    ],
    controllers: [MoviesController],
    providers: [...movieProviders, ...movieMongoProviders, MoviesService],
    exports: [...movieMongoProviders],
})
export class MoviesModule {}
