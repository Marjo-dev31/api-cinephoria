import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { Movie } from '../../movies/entities/movie.entity';
import { Room } from '../../room/entities/room.entity';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateShowingDto {
    @ApiProperty({ type: String, format: 'date-time' })
    @IsDate()
    @Type(() => Date)
    @IsNotEmpty()
    date!: Date;

    @ApiProperty({ example: '14:30' })
    @IsString()
    startAt!: string;

    @ApiProperty({ example: '16:45' })
    @IsString()
    endAt!: string;

    @ApiProperty({
        description: 'Film projeté',
        type: 'object',
        additionalProperties: true,
    })
    movie!: Movie;

    @ApiProperty({
        description: 'Salle de projection',
        type: 'object',
        additionalProperties: true,
    })
    room!: Room;
}
