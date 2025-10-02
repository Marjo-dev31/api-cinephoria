import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { DatabaseModule } from '../config/database.module';
import { movieProviders } from './movie.providers';
import { MulterModule } from '@nestjs/platform-express';
import { movieMongoProviders } from './movie.mongo.providers';

@Module({
    imports: [DatabaseModule, MulterModule.register({ dest: './uploads' })],
    controllers: [MoviesController],
    providers: [...movieProviders, ...movieMongoProviders, MoviesService],
    exports: [...movieMongoProviders],
})
export class MoviesModule {}
