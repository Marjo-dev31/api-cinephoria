import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { Movie } from '../../movies/entities/movie.entity';
import { Room } from '../../room/entities/room.entity';

export class CreateShowingDto {
    @IsDate()
    @IsNotEmpty()
    date: Date;

    @IsString()
    startAt: string;

    @IsString()
    endAt: string;

    @IsString()
    movie: Movie;

    @IsString()
    room: Room;
}
