import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { orderProviders } from './order.providers';
import { DatabaseModule } from '../config/database.module';
import { MoviesModule } from '../movies/movies.module';
import { UserModule } from '../user/user.module';

@Module({
    imports: [DatabaseModule, MoviesModule, UserModule],
    controllers: [OrderController],
    providers: [...orderProviders, OrderService],
})
export class OrderModule {}
