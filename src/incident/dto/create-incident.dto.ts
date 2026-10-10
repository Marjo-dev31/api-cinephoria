import { IsDate, IsNotEmpty } from 'class-validator';
import { Room } from '../../room/entities/room.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateIncidentDto {
    @ApiProperty({ example: 'Projecteur indisponible' })
    @IsNotEmpty()
    description!: string;

    @ApiProperty({ type: String, format: 'date-time' })
    @IsDate()
    date!: Date;

    @ApiProperty({
        description: 'Salle concernée',
        type: 'object',
        additionalProperties: true,
    })
    @IsNotEmpty()
    room!: Room;
}
