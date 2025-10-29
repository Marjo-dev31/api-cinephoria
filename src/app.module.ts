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
import { UploadModule } from './upload/upload.module';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { IncidentModule } from './incident/incident.module';

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
        UploadModule,
        UserModule,
        RoleModule,
        IncidentModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
