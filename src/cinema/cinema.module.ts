import { Module } from '@nestjs/common';
import { CinemaService } from './cinema.service';
import { CinemaController } from './cinema.controller';
import { DatabaseModule } from '../config/database.module';
import { cinemaProviders } from './cinema.providers';

@Module({
    imports: [DatabaseModule],
    controllers: [CinemaController],
    providers: [...cinemaProviders, CinemaService],
})
export class CinemaModule {}
