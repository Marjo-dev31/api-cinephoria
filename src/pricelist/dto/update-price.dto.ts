import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreatePriceDto } from './create-price.dto';

export class UpdatePriceDto extends PartialType(CreatePriceDto) {
    @IsString()
    @IsNotEmpty()
    id: string;
}
