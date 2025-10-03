import {
    IsEmail,
    IsNotEmpty,
    IsString,
    IsStrongPassword,
    MinLength,
} from 'class-validator';
import { Role } from '../../role/entities/role.entity';

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    firstname: string;

    @IsNotEmpty()
    @IsString()
    lastname: string;

    @IsNotEmpty()
    @IsEmail()
    mail: string;

    @MinLength(12)
    @IsString()
    @IsStrongPassword() // default options: { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1}
    password: string;

    role: Role;

    @IsString()
    username: string;
}
