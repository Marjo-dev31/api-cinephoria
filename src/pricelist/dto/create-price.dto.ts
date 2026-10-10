import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePriceDto {
    @ApiProperty({ example: 12.5, minimum: 0 })
    @IsNotEmpty()
    @IsNumber({ maxDecimalPlaces: 2 })
    price!: number;
}
