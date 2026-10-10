import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateShowingDto } from './create-showing.dto';
import { IsString } from 'class-validator';

export class UpdateShowingDto extends PartialType(CreateShowingDto) {
    @ApiProperty({ format: 'uuid' })
    @IsString()
    id!: string;
}
