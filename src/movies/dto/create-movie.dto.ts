import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMovieDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    image_Url: string;

    @IsNumber()
    minimun_Age: number;

    @IsBoolean()
    is_Favorite: boolean;
}
