import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { DatabaseModule } from 'src/config/database.module';
import { reviewProviders } from './review.providers';

@Module({
    imports: [DatabaseModule],
    controllers: [ReviewsController],
    providers: [ReviewsService, ...reviewProviders],
})
export class ReviewsModule {}
