import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateRoomDto } from './create-room.dto';
import { IsString } from 'class-validator';

export class UpdateRoomDto extends PartialType(CreateRoomDto) {
    @ApiProperty({ format: 'uuid' })
    @IsString()
    id!: string;
}
