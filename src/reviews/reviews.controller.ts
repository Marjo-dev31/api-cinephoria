import {
    Controller,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Get,
    UseGuards,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { AuthGuard } from '../user/auth.guard';
import { Roles } from '../role/roles-guard/roles.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Avis')
@Controller('reviews')
export class ReviewsController {
    constructor(private readonly reviewsService: ReviewsService) {}

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Post()
    create(@Body() createReviewDto: CreateReviewDto) {
        return this.reviewsService.create(createReviewDto);
    }

    @Get()
    findAll() {
        return this.reviewsService.findAll();
    }

    // @Get(':id')
    // findOne(@Param('id') id: string) {
    //     return this.reviewsService.findOne(id);
    // }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Patch(':id')
    @Roles(['employee'])
    update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
        return this.reviewsService.update(id, updateReviewDto);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.reviewsService.remove(id);
    }
}
