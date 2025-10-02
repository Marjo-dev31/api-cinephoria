import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ORDER_REPOSITORY } from './constants';
import { MongoRepository, Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { MOVIE_MONGO_REPOSITORY } from '../movies/constants';
import { MovieMongo } from '../movies/entities/movie.mongo';

@Injectable()
export class OrderService {
    constructor(
        @Inject(ORDER_REPOSITORY)
        private orderRepository: Repository<Order>,
        @Inject(MOVIE_MONGO_REPOSITORY)
        private movieMongoRepository: MongoRepository<MovieMongo>,
    ) {}
    async create(createOrderDto: CreateOrderDto) {
        const newOrder = this.orderRepository.create(createOrderDto);
        await this.movieMongoRepository.increment(
            { title: createOrderDto.showing.movie.title },
            'nbOfSales',
            createOrderDto.quantity,
        );
        return await this.orderRepository.save(newOrder);
    }

    findAll() {
        return `This action returns all order`;
    }

    async findByUser(id: string) {
        return await this.orderRepository.find({
            where: { user: { id: id } },
            relations: { showing: { movie: true, room: { cinema: true } } },
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
