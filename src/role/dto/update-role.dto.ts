import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateRoleDto } from './create-role.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {
    @ApiProperty({ format: 'uuid' })
    @IsString()
    @IsNotEmpty()
    id!: string;
}
