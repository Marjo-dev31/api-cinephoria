import { IsDate, IsNotEmpty } from 'class-validator';
import { Room } from '../../room/entities/room.entity';

export class CreateIncidentDto {
    @IsNotEmpty()
    description: string;

    @IsDate()
    date: Date;

    @IsNotEmpty()
    room: Room;
}
