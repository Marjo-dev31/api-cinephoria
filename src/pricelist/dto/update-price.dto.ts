import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreatePriceDto } from './create-price.dto';

export class UpdateCinemaDto extends PartialType(CreatePriceDto) {
    @IsString()
    @IsNotEmpty()
    id: string;
}
