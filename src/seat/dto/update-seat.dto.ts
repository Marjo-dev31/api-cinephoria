import { PartialType } from '@nestjs/mapped-types';
import { CreateSeatDto } from './create-seat.dto';
import { IsString } from 'class-validator';
import { Order } from 'src/order/entities/order.entity';

export class UpdateSeatDto extends PartialType(CreateSeatDto) {
    @IsString()
    id: string;

    order: Order;
}
