import {
    IsEmail,
    IsNotEmpty,
    IsString,
    IsStrongPassword,
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

    @IsNotEmpty()
    @IsStrongPassword()
    password: string;

    @IsString()
    role: Role;

    @IsString()
    username: string;
}
