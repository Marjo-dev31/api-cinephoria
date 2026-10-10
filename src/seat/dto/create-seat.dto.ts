import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';
import { Showing } from '../../showing/entities/showing.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSeatDto {
    @ApiProperty({ example: 18, minimum: 1 })
    @IsNumber()
    @IsNotEmpty()
    number!: number;

    @ApiProperty({ example: false })
    @IsBoolean()
    accessibleSeat!: boolean;

    @ApiProperty({ example: false })
    @IsBoolean()
    reserved!: boolean;

    @ApiProperty({
        description: 'Séance associée',
        type: 'object',
        additionalProperties: true,
    })
    showing!: Showing;
}
