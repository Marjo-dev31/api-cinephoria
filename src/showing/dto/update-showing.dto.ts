import { PartialType } from '@nestjs/mapped-types';
import { CreateShowingDto } from './create-showing.dto';
import { IsString } from 'class-validator';

export class UpdateShowingDto extends PartialType(CreateShowingDto) {
    @IsString()
    id: string;
}
