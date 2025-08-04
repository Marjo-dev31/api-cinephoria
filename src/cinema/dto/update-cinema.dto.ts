import { PartialType } from '@nestjs/mapped-types';
import { CreateCinemaDto } from './create-cinema.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateCinemaDto extends PartialType(CreateCinemaDto) {
    @IsString()
    @IsNotEmpty()
    id: string;
}
