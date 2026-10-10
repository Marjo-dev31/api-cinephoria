import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCinemaDto } from './create-cinema.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateCinemaDto extends PartialType(CreateCinemaDto) {
    @ApiProperty({ format: 'uuid' })
    @IsString()
    @IsNotEmpty()
    id!: string;
}
