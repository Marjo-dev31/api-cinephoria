import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
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

    minimun_Age: number;

    @IsBoolean()
    is_Favorite: boolean;

    @IsNotEmpty()
    genre: Genre;
}
