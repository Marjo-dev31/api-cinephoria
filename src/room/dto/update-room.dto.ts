import { PartialType } from '@nestjs/mapped-types';
import { CreateRoomDto } from './create-room.dto';
import { IsString } from 'class-validator';

export class UpdateRoomDto extends PartialType(CreateRoomDto) {
    @IsString()
    id: string;
}
