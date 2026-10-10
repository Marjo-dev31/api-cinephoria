import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateOrderDto } from './create-order.dto';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
    @ApiProperty({ format: 'uuid' })
    @IsUUID()
    @IsNotEmpty()
    @IsString()
    id!: string;
}
