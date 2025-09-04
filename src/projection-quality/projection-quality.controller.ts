import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { ProjectionQualityService } from './projection-quality.service';
import { CreateProjectionQualityDto } from './dto/create-projection-quality.dto';
import { UpdateProjectionQualityDto } from './dto/update-projection-quality.dto';

@Controller('projection-quality')
export class ProjectionQualityController {
    constructor(
        private readonly projectionQualityService: ProjectionQualityService,
    ) {}

    @Post()
    create(@Body() createProjectionQualityDto: CreateProjectionQualityDto) {
        return this.projectionQualityService.create(createProjectionQualityDto);
    }

    @Get()
    findAll() {
        return this.projectionQualityService.findAll();
    }

    // @Get(':id')
    // findOne(@Param('id') id: string) {
    //     return this.projectionQualityService.findOne(id);
    // }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateProjectionQualityDto: UpdateProjectionQualityDto,
    ) {
        return this.projectionQualityService.update(
            id,
            updateProjectionQualityDto,
        );
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.projectionQualityService.remove(id);
    }
}
