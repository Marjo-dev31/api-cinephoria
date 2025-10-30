import { PartialType } from '@nestjs/mapped-types';
import { CreateReviewDto } from './create-review.dto';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class UpdateReviewDto extends PartialType(CreateReviewDto) {
    @IsNotEmpty()
    @IsString()
    id: string;

    @IsBoolean()
    is_Validated: boolean;
}
