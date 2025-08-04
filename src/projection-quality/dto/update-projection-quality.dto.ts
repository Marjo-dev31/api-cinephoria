import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateProjectionQualityDto } from './create-projection-quality.dto';

export class UpdateProjectionQualityDto extends PartialType(
    CreateProjectionQualityDto,
) {
    @IsString()
    @IsNotEmpty()
    id: string;
}
