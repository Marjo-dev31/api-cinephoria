import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';
import { Showing } from '../../showing/entities/showing.entity';
import { Seat } from '../../seat/entities/seat.entity';
import { User } from '../../user/entities/user.entity';

export class CreateOrderDto {
    @IsNumber()
    quantity: number;

    @IsNumber({ maxDecimalPlaces: 2 })
    total: number;

    @IsNotEmpty()
    showing: Showing;

    @IsArray()
    seat: Seat[];

    @IsNotEmpty()
    user: User;
}
