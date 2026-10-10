import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateSeatDto } from './create-seat.dto';
import { IsString } from 'class-validator';
import { Order } from '../../order/entities/order.entity';

export class UpdateSeatDto extends PartialType(CreateSeatDto) {
    @ApiProperty({ format: 'uuid' })
    @IsString()
    id!: string;

    @ApiProperty({
        description: 'Commande associée',
        type: 'object',
        additionalProperties: true,
    })
    order!: Order;
}
