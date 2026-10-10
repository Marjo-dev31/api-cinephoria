import { IsNotEmpty, IsString } from 'class-validator';
import { Price } from '../../pricelist/entities/price.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectionQualityDto {
    @ApiProperty({ example: 'IMAX' })
    @IsNotEmpty()
    @IsString()
    quality!: string;

    @ApiProperty({
        description: 'Tarif associé',
        type: 'object',
        additionalProperties: true,
    })
    @IsNotEmpty()
    price!: Price;
}
