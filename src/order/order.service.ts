import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ORDER_REPOSITORY } from './constants';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { DYNAMODB_DOCUMENT_CLIENT } from '../config/dynamodb.providers';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import { randomUUID } from 'crypto';

@Injectable()
export class OrderService {
    constructor(
        @Inject(ORDER_REPOSITORY)
        private orderRepository: Repository<Order>,
        @Inject(DYNAMODB_DOCUMENT_CLIENT)
        private readonly dynamoDb: DynamoDBDocumentClient,
    ) {}

    async create(createOrderDto: CreateOrderDto) {
        const newOrder = this.orderRepository.create(createOrderDto);
        await this.dynamoDb.send(
            new PutCommand({
                TableName: process.env.DYNAMODB_TABLE_NAME,
                Item: {
                    id: randomUUID(),
                    title: createOrderDto.showing.movie.title,
                    nbOfSales: createOrderDto.quantity,
                    create_At: new Date().toISOString(),
                },
            }),
        );
        return await this.orderRepository.save(newOrder);
    }

    findAll() {
        return `This action returns all order`;
    }

    async findByUser(id: string) {
        return await this.orderRepository.find({
            where: { user: { id: id } },
            relations: {
                showing: {
                    movie: true,
                    room: { cinema: true, projectionQuality: true },
                },
                seat: true,
            },
        });
    }

    async update(id: string, updateOrderDto: UpdateOrderDto) {
        return await this.orderRepository.update(
            { id },
            { quantity: updateOrderDto.quantity, total: updateOrderDto.total },
        );
    }

    remove(id: string) {
        return `This action removes a #${id} order`;
    }
}
