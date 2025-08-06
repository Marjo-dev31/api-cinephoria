import { IsNotEmpty, IsNumber } from 'class-validator';
import { Cinema } from '../../cinema/entities/cinema.entity';
import { ProjectionQuality } from '../../projection-quality/entities/projection-quality.entity';

export class CreateRoomDto {
    @IsNumber()
    @IsNotEmpty()
    number: number;

    @IsNumber()
    numberOfSeats: number;

    @IsNotEmpty()
    cinema: Cinema;

    @IsNotEmpty()
    projectionQuality: ProjectionQuality;
}
