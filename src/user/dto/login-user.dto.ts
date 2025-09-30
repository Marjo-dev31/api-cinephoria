import { IsEmail, IsString } from 'class-validator';

export class loginUserDto {
    @IsEmail()
    mail: string;

    @IsString()
    password: string;
}
