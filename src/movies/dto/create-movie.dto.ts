import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateMovieDto {
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsString()
    image_Url: string;

    @IsNumber()
    minimun_Age: number;

    @IsBoolean()
    is_Favorite: boolean;
}
