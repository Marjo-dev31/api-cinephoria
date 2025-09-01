import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { orderProviders } from './order.providers';
import { DatabaseModule } from 'src/config/database.module';

@Module({
    imports: [DatabaseModule],
    controllers: [OrderController],
    providers: [...orderProviders, OrderService],
})
export class OrderModule {}
