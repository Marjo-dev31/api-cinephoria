import { IsNotEmpty, IsString } from 'class-validator';
import { Country } from '../../country/entities/country.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCinemaDto {
    @ApiProperty({ example: 'Paris' })
    @IsNotEmpty()
    @IsString()
    city!: string;

    @ApiProperty({
        description: 'Pays associé au cinéma',
        type: 'object',
        additionalProperties: true,
    })
    @IsNotEmpty()
    country!: Country;
}
