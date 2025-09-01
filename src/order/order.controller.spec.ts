import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { ORDER_REPOSITORY } from './constants';

describe('OrderController', () => {
    let controller: OrderController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [OrderController],
            providers: [
                OrderService,
                { provide: ORDER_REPOSITORY, useValue: 'ORDER_REPOSITORY' },
            ],
        }).compile();

        controller = module.get<OrderController>(OrderController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
