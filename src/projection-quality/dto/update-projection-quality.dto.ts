import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateProjectionQualityDto } from './create-projection-quality.dto';

export class UpdateProjectionQualityDto extends PartialType(
    CreateProjectionQualityDto,
) {
    @ApiProperty({ format: 'uuid' })
    @IsString()
    @IsNotEmpty()
    id!: string;
}
