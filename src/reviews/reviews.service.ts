import { Inject, Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { REVIEW_REPOSITORY } from './constants';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';

@Injectable()
export class ReviewsService {
    constructor(
        @Inject(REVIEW_REPOSITORY)
        private reviewRepository: Repository<Review>,
    ) {}

    async create(createReviewDto: CreateReviewDto) {
        const newReview = this.reviewRepository.create(createReviewDto);
        return await this.reviewRepository.save(newReview);
    }

    async findAll(): Promise<UpdateReviewDto[]> {
        return await this.reviewRepository.find({
            relations: {
                movie: true,
            },
        });
    }

    // findOne(id: string) {
    //     return `This action returns a #${id} review`;
    // }

    async update(id: string, updateReviewDto: UpdateReviewDto) {
        return await this.reviewRepository.update(
            {
                id,
            },
            {
                is_Validated: updateReviewDto.is_Validated,
            },
        );
    }

    async remove(id: string) {
        return await this.reviewRepository.delete({ id });
    }
}
