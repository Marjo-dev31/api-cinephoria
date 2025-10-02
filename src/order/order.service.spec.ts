import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { ORDER_REPOSITORY } from './constants';
import { MOVIE_MONGO_REPOSITORY } from '../movies/constants';

describe('OrderService', () => {
    let service: OrderService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OrderService,
                { provide: ORDER_REPOSITORY, useValue: 'ORDER_REPOSITORY' },
                {
                    provide: MOVIE_MONGO_REPOSITORY,
                    useValue: 'MOVIE_MONGO_REPOSITORY',
                },
            ],
        }).compile();

        service = module.get<OrderService>(OrderService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
