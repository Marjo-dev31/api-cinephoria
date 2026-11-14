import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { ORDER_REPOSITORY } from './constants';
import { DYNAMODB_DOCUMENT_CLIENT } from '../config/dynamodb.providers';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PutCommand } from '@aws-sdk/lib-dynamodb';

describe('OrderService', () => {
    let service: OrderService;
    const orderRepository = {
        create: jest.fn(),
        save: jest.fn(),
        find: jest.fn(),
        update: jest.fn(),
    };
    const dynamoDb: { send: jest.Mock<Promise<unknown>, [PutCommand]> } = {
        send: jest.fn<Promise<unknown>, [PutCommand]>(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OrderService,
                { provide: ORDER_REPOSITORY, useValue: orderRepository },
                {
                    provide: DYNAMODB_DOCUMENT_CLIENT,
                    useValue: dynamoDb,
                },
            ],
        }).compile();

        service = module.get<OrderService>(OrderService);
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('creates an order, records its sale in DynamoDB, then saves it', async () => {
        const createOrderDto: CreateOrderDto = {
            quantity: 2,
            total: 24.5,
            showing: {
                movie: { title: 'Dune: Part Two' },
            } as CreateOrderDto['showing'],
            seat: [],
            user: {} as CreateOrderDto['user'],
        };
        const newOrder = { id: 'order-id', ...createOrderDto };
        const savedOrder = { ...newOrder, id: 'saved-order-id' };
        orderRepository.create.mockReturnValue(newOrder);
        dynamoDb.send.mockResolvedValue({});
        orderRepository.save.mockResolvedValue(savedOrder);

        await expect(service.create(createOrderDto)).resolves.toEqual(
            savedOrder,
        );

        expect(orderRepository.create).toHaveBeenCalledWith(createOrderDto);
        expect(dynamoDb.send).toHaveBeenCalledTimes(1);
        const [command] = dynamoDb.send.mock.calls[0];
        const item = command.input.Item as {
            id: string;
            title: string;
            nbOfSales: number;
            create_At: string;
        };
        expect(command).toBeInstanceOf(PutCommand);
        expect(command.input.TableName).toBe(process.env.DYNAMODB_TABLE_NAME);
        expect(item.title).toBe('Dune: Part Two');
        expect(item.nbOfSales).toBe(2);
        expect(typeof item.id).toBe('string');
        expect(typeof item.create_At).toBe('string');
        expect(orderRepository.save).toHaveBeenCalledWith(newOrder);
    });

    it('finds all orders belonging to a user with their relations', async () => {
        const orders = [{ id: 'order-id' }];
        orderRepository.find.mockResolvedValue(orders);

        await expect(service.findByUser('user-id')).resolves.toEqual(orders);

        expect(orderRepository.find).toHaveBeenCalledWith({
            where: { user: { id: 'user-id' } },
            relations: {
                showing: {
                    movie: true,
                    room: { cinema: true, projectionQuality: true },
                },
                seat: true,
            },
        });
    });

    it('updates only the quantity and total of an order', async () => {
        const updateOrderDto: UpdateOrderDto = {
            id: 'order-id',
            quantity: 3,
            total: 36.75,
        };
        const updateResult = { affected: 1 };
        orderRepository.update.mockResolvedValue(updateResult);

        await expect(
            service.update('order-id', updateOrderDto),
        ).resolves.toEqual(updateResult);

        expect(orderRepository.update).toHaveBeenCalledWith(
            { id: 'order-id' },
            { quantity: 3, total: 36.75 },
        );
    });
});
