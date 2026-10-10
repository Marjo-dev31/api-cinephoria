import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGenreDto {
    @ApiProperty({ example: 'Science-fiction' })
    @IsNotEmpty()
    @IsString()
    title!: string;
}
