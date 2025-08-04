import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePriceDto {
    @IsNotEmpty()
    @IsNumber({ maxDecimalPlaces: 2 })
    price: number;
}
