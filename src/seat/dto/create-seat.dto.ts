import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';
import { Showing } from 'src/showing/entities/showing.entity';

export class CreateSeatDto {
    @IsNumber()
    @IsNotEmpty()
    number: number;

    @IsBoolean()
    accessible: boolean;

    @IsBoolean()
    reserved: boolean;

    showing: Showing;
}
