import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Movie } from '../../movies/entities/movie.entity';
import { User } from '../../user/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewDto {
    @ApiProperty({ example: 'Très bon film.' })
    @IsNotEmpty()
    @IsString()
    description!: string;

    @ApiProperty({ example: 5, minimum: 0, maximum: 5 })
    @IsNotEmpty()
    @IsNumber()
    grade!: number;

    @ApiProperty({
        description: 'Film évalué',
        type: 'object',
        additionalProperties: true,
    })
    @IsNotEmpty()
    movie!: Movie;

    @ApiProperty({
        description: 'Auteur de l’avis',
        type: 'object',
        additionalProperties: true,
    })
    @IsNotEmpty()
    user!: User;
}
