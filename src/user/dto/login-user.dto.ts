import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class loginUserDto {
    @ApiProperty({ example: 'ada.lovelace@example.com', format: 'email' })
    @IsString()
    @IsEmail()
    mail!: string;

    @ApiProperty({ example: 'MotDePasseFort!2026', format: 'password' })
    @IsString()
    password!: string;
}
