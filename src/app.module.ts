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
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
