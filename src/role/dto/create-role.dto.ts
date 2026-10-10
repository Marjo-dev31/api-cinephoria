import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
    @ApiProperty({ example: 'admin' })
    @IsString()
    @IsNotEmpty()
    name!: string;
}
