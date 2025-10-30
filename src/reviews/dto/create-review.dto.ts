import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Movie } from '../../movies/entities/movie.entity';
import { User } from '../../user/entities/user.entity';

export class CreateReviewDto {
    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsNumber()
    grade: number;

    @IsNotEmpty()
    movie: Movie;

    @IsNotEmpty()
    user: User;
}
