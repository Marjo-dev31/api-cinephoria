import { Injectable, Inject } from '@nestjs/common';
import { PROJECTION_QUALITY_REPOSITORY } from './constants';
import { Repository } from 'typeorm';
import { ProjectionQuality } from './entities/projection-quality.entity';
import { CreateProjectionQualityDto } from './dto/create-projection-quality.dto';
import { UpdateProjectionQualityDto } from './dto/update-projection-quality.dto';
@Injectable()
export class ProjectionQualityService {
    constructor(
        @Inject(PROJECTION_QUALITY_REPOSITORY)
        private projectionQualityRepository: Repository<ProjectionQuality>,
    ) {}

    async create(createProjectionQualityDto: CreateProjectionQualityDto) {
        const newProjectionQuality = this.projectionQualityRepository.create(
            createProjectionQualityDto,
        );
        return await this.projectionQualityRepository.save(
            newProjectionQuality,
        );
    }

    async findAll() {
        return await this.projectionQualityRepository.find();
    }

    // findOne(id: string) {
    //     return `This action returns a #${id} cinema`;
    // }

    async update(
        id: string,
        updateProjectionQualityDto: UpdateProjectionQualityDto,
    ) {
        return await this.projectionQualityRepository.update(
            { id },
            {
                quality: updateProjectionQualityDto.quality,
            },
        );
    }

    async remove(id: string) {
        return await this.projectionQualityRepository.delete({ id });
    }
}
