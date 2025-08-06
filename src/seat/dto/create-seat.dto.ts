import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Room } from '../../room/entities/room.entity';

export class CreateSeatDto {
    @IsNumber()
    @IsNotEmpty()
    number: number;

    @IsBoolean()
    accessible: boolean;

    @IsBoolean()
    reserved: boolean;

    @IsOptional()
    room: Room;
}
