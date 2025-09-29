import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { Order } from '../../order/entities/order.entity';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsNotEmpty()
    @IsUUID()
    id: string;

    order: Order[];
}
