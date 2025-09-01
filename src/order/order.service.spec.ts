import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { ORDER_REPOSITORY } from './constants';

describe('OrderService', () => {
    let service: OrderService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OrderService,
                { provide: ORDER_REPOSITORY, useValue: 'ORDER_REPOSITORY' },
            ],
        }).compile();

        service = module.get<OrderService>(OrderService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
