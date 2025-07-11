import { PartialType } from '@nestjs/mapped-types';
import { CreateReviewDto } from './create-review.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateReviewDto extends PartialType(CreateReviewDto) {
    @IsNotEmpty()
    @IsString()
    id: string;
}
