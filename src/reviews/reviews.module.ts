import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { DatabaseModule } from '../config/database.module';
import { reviewProviders } from './review.providers';
import { UserModule } from '../user/user.module';

@Module({
    imports: [DatabaseModule, UserModule],
    controllers: [ReviewsController],
    providers: [ReviewsService, ...reviewProviders],
})
export class ReviewsModule {}
