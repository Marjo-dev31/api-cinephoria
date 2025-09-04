import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './config/database.module';
import { MoviesModule } from './movies/movies.module';
import { GenreModule } from './genre/genre.module';
import { ReviewsModule } from './reviews/reviews.module';
import { CountryModule } from './country/country.module';
import { CinemaModule } from './cinema/cinema.module';
import { SeatModule } from './seat/seat.module';
import { RoomModule } from './room/room.module';
import { ShowingModule } from './showing/showing.module';
import { OrderModule } from './order/order.module';
import { ProjectionQualityModule } from './projection-quality/projection-quality.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        DatabaseModule,
        MoviesModule,
        GenreModule,
        ReviewsModule,
        CountryModule,
        CinemaModule,
        SeatModule,
        RoomModule,
        ShowingModule,
        OrderModule,
        ProjectionQualityModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
