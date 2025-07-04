import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { DatabaseModule } from 'src/config/database.module';
import { movieProviders } from './movie.providers';
import { MulterModule } from '@nestjs/platform-express';

@Module({
    imports: [DatabaseModule, MulterModule.register({ dest: './uploads' })],
    controllers: [MoviesController],
    providers: [...movieProviders, MoviesService],
})
export class MoviesModule {}
