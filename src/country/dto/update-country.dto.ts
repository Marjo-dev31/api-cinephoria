import { PartialType } from '@nestjs/mapped-types';
import { CreateCountryDto } from './create-country.dto';
import { IsString } from 'class-validator';

export class UpdateCountryDto extends PartialType(CreateCountryDto) {
    @IsString()
    id: string;
}
