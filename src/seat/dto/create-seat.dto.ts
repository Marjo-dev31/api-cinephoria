import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateSeatDto {
    @IsNumber()
    @IsNotEmpty()
    number: number;

    @IsBoolean()
    accessible: boolean;

    @IsBoolean()
    reserved: boolean;
}
