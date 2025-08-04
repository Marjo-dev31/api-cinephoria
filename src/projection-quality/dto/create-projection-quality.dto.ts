import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProjectionQualityDto {
    @IsNotEmpty()
    @IsString()
    quality: string;

    // @ManyToOne(()=> Price, ()=> )
}
