import {
    IsEmail,
    IsNotEmpty,
    IsString,
    IsStrongPassword,
    MinLength,
} from 'class-validator';
import { Role } from '../../role/entities/role.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({ example: 'Ada' })
    @IsNotEmpty()
    @IsString()
    firstname!: string;

    @ApiProperty({ example: 'Lovelace' })
    @IsNotEmpty()
    @IsString()
    lastname!: string;

    @ApiProperty({ example: 'ada.lovelace@example.com', format: 'email' })
    @IsNotEmpty()
    @IsEmail()
    mail!: string;

    @ApiProperty({ example: 'MotDePasseFort!2026', format: 'password' })
    @MinLength(12)
    @IsString()
    @IsStrongPassword() // default options: { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1}
    password!: string;

    @ApiProperty({
        description: 'Rôle attribué à l’utilisateur',
        type: 'object',
        additionalProperties: true,
    })
    role!: Role;

    @ApiProperty({ example: 'ada.lovelace' })
    @IsString()
    username!: string;
}
