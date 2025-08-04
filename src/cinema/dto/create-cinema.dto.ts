import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCinemaDto {
    @IsNotEmpty()
    @IsString()
    city: string;
}
