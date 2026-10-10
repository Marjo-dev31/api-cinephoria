import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateReviewDto } from './create-review.dto';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class UpdateReviewDto extends PartialType(CreateReviewDto) {
    @ApiProperty({ format: 'uuid' })
    @IsNotEmpty()
    @IsString()
    id!: string;

    @ApiProperty({ example: true })
    @IsBoolean()
    is_Validated!: boolean;
}
