import { IsEmail, IsString } from 'class-validator';

export class loginUserDto {
    @IsString()
    @IsEmail()
    mail: string;

    @IsString()
    password: string;
}
