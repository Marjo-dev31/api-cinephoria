import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { Order } from '../../order/entities/order.entity';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @ApiProperty({ format: 'uuid' })
    @IsNotEmpty()
    @IsUUID()
    id!: string;

    @ApiProperty({ type: 'array', items: { type: 'object' } })
    order!: Order[];
}
