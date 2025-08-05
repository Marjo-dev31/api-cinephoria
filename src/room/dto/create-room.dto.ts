import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateRoomDto {
    @IsNumber()
    @IsNotEmpty()
    number: number;

    @IsNumber()
    numberOfSeats: number;
}
