import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieDto } from './create-movie.dto';
import { IsDate, IsString } from 'class-validator';

export class UpdateMovieDto extends PartialType(CreateMovieDto) {
    @IsString()
    id: string;

    @IsDate()
    create_At: Date;
}
