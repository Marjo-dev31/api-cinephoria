import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Genre } from '../../genre/entities/genre.entity';

export class CreateMovieDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsString()
    image_Url: string;

    @IsNumber()
    minimun_Age: number;

    @IsBoolean()
    is_Favorite: boolean;

    @IsString()
    genre: Genre;
}
