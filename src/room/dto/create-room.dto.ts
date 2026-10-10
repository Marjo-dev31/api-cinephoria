import { IsNotEmpty, IsNumber } from 'class-validator';
import { Cinema } from '../../cinema/entities/cinema.entity';
import { ProjectionQuality } from '../../projection-quality/entities/projection-quality.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoomDto {
    @ApiProperty({ example: 4, minimum: 1 })
    @IsNumber()
    @IsNotEmpty()
    number!: number;

    @ApiProperty({ example: 120, minimum: 1 })
    @IsNumber()
    numberOfSeats!: number;

    @ApiProperty({
        description: 'Cinéma auquel appartient la salle',
        type: 'object',
        additionalProperties: true,
    })
    @IsNotEmpty()
    cinema!: Cinema;

    @ApiProperty({
        description: 'Qualité de projection',
        type: 'object',
        additionalProperties: true,
    })
    @IsNotEmpty()
    projectionQuality!: ProjectionQuality;
}
