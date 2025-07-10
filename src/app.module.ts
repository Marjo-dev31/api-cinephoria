import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './config/database.module';
import { MoviesModule } from './movies/movies.module';
import { GenreModule } from './genre/genre.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        DatabaseModule,
        MoviesModule,
        GenreModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
