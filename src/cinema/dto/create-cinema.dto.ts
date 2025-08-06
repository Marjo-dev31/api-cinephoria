import { IsNotEmpty, IsString } from 'class-validator';
import { Country } from '../../country/entities/country.entity';

export class CreateCinemaDto {
    @IsNotEmpty()
    @IsString()
    city: string;

    @IsNotEmpty()
    country: Country;
}
