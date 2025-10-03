import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { Movie } from '../../movies/entities/movie.entity';
import { Room } from '../../room/entities/room.entity';
import { Type } from 'class-transformer';

export class CreateShowingDto {
    @IsDate()
    @Type(() => Date)
    @IsNotEmpty()
    date: Date;

    @IsString()
    startAt: string;

    @IsString()
    endAt: string;

    movie: Movie;

    room: Room;
}
