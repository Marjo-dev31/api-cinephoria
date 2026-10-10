import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreatePriceDto } from './create-price.dto';

export class UpdatePriceDto extends PartialType(CreatePriceDto) {
    @ApiProperty({ format: 'uuid' })
    @IsString()
    @IsNotEmpty()
    id!: string;
}
