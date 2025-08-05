import { PartialType } from '@nestjs/mapped-types';
import { CreateSeatDto } from './create-seat.dto';
import { IsString } from 'class-validator';

export class UpdateSeatDto extends PartialType(CreateSeatDto) {
    @IsString()
    id: string;
}
