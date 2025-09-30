import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Movie } from '../../movies/entities/movie.entity';

export class CreateReviewDto {
    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsNumber()
    grade: number;

    @IsBoolean()
    is_Validated: boolean;

    @IsNotEmpty()
    movie: Movie;

    @IsString()
    username: string;
}
