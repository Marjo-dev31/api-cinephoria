import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateMovieDto } from './create-movie.dto';
import { IsDate, IsString } from 'class-validator';
import { UpdateReviewDto } from '../../reviews/dto/update-review.dto';
import { Showing } from '../../showing/entities/showing.entity';

export class UpdateMovieDto extends PartialType(CreateMovieDto) {
    @ApiProperty({ format: 'uuid' })
    @IsString()
    id!: string;

    @ApiProperty({ type: 'array', items: { type: 'object' } })
    reviews!: UpdateReviewDto[];
}

export class MovieDto extends PartialType(UpdateMovieDto) {
    @ApiProperty({ type: 'array', items: { type: 'object' } })
    showing!: Showing[];

    @ApiProperty({ type: String, format: 'date-time' })
    @IsDate()
    created_At!: Date;
}
