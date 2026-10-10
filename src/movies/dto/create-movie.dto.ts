import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Genre } from '../../genre/entities/genre.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMovieDto {
    @ApiProperty({ example: 'Interstellar' })
    @IsNotEmpty()
    @IsString()
    title!: string;

    @ApiProperty({ example: 'Une expédition au-delà de notre galaxie.' })
    @IsNotEmpty()
    @ApiProperty({ example: '/uploads/interstellar.jpg' })
    @IsString()
    description!: string;

    @IsString()
    image_Url!: string;

    @ApiProperty({ example: 10, minimum: 0 })
    @IsNumber()
    minimum_Age!: number;

    @ApiProperty({ example: false })
    @IsBoolean()
    is_Favorite!: boolean;

    @ApiProperty({
        description: 'Genre du film',
        type: 'object',
        additionalProperties: true,
    })
    @IsNotEmpty()
    genre!: Genre;
}
