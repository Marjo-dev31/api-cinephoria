import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/config/database.module';
import { GenreController } from './genre.controller';
import { GenreService } from './genre.service';
import { genreProviders } from './genre.provider';

@Module({
    imports: [DatabaseModule],
    controllers: [GenreController],
    providers: [...genreProviders, GenreService],
})
export class GenreModule {}
