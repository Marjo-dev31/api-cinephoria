import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCountryDto } from './create-country.dto';
import { IsString } from 'class-validator';

export class UpdateCountryDto extends PartialType(CreateCountryDto) {
    @ApiProperty({ format: 'uuid' })
    @IsString()
    id!: string;
}
