import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { ORDER_REPOSITORY } from './constants';
import { DYNAMODB_DOCUMENT_CLIENT } from '../config/dynamodb.providers';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

describe('OrderController', () => {
    let controller: OrderController;
    const mockJwtService: Partial<JwtService> = {};
    const mockConfigService: Partial<ConfigService> = {
        get: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [OrderController],
            providers: [
                OrderService,
                { provide: ORDER_REPOSITORY, useValue: 'ORDER_REPOSITORY' },
                {
                    provide: DYNAMODB_DOCUMENT_CLIENT,
                    useValue: 'DYNAMODB_DOCUMENT_CLIENT',
                },
                { provide: JwtService, useValue: mockJwtService as JwtService },
                {
                    provide: ConfigService,
                    useValue: mockConfigService as ConfigService,
                },
            ],
        }).compile();

        controller = module.get<OrderController>(OrderController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
