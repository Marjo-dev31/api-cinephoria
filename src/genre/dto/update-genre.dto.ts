import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateGenreDto } from './create-genre.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateGenreDto extends PartialType(CreateGenreDto) {
    @ApiProperty({ format: 'uuid' })
    @IsNotEmpty()
    @IsString()
    id!: string;
}
