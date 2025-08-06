import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieDto } from './create-movie.dto';
import { IsDate, IsString } from 'class-validator';
import { UpdateReviewDto } from '../../reviews/dto/update-review.dto';
import { Showing } from '../../showing/entities/showing.entity';

export class UpdateMovieDto extends PartialType(CreateMovieDto) {
    @IsString()
    id: string;

    @IsDate()
    create_At: Date;

    reviews: UpdateReviewDto[];
}

export class MovieDto extends PartialType(UpdateMovieDto) {
    showing: Showing[];
}
