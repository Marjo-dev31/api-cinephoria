import { IsNotEmpty, IsString } from 'class-validator';
import { Price } from '../../pricelist/entities/price.entity';

export class CreateProjectionQualityDto {
    @IsNotEmpty()
    @IsString()
    quality: string;

    @IsNotEmpty()
    price: Price;
}
