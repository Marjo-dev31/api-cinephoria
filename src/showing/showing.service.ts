/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Inject, Injectable } from '@nestjs/common';
import { CreateShowingDto } from './dto/create-showing.dto';
import { UpdateShowingDto } from './dto/update-showing.dto';
import { DataSource, Repository } from 'typeorm';
import { Showing } from './entities/showing.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ShowingService {
    constructor(
        @Inject('SHOWING_REPOSITORY')
        private showingRepository: Repository<Showing>,
        @Inject('DATA_SOURCE') private readonly dataSource: DataSource,
    ) {}

    // async create(createShowingDto: CreateShowingDto) {
    //     const newShowing = this.showingRepository.create(createShowingDto);
    //     return await this.showingRepository.save(newShowing);
    // }

    async create(createShowingDto: CreateShowingDto) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        try {
            await queryRunner.startTransaction();
            const showingId: string = uuidv4();
            const date = new Date(createShowingDto.date);
            const createShowing: any = await queryRunner.query(
                `INSERT INTO showing(id, date, startAt, endAt, movieId, roomId) VALUES (?, ?, ?, ?, ?, ?)`,
                [
                    showingId,
                    date,
                    createShowingDto.startAt,
                    createShowingDto.endAt,
                    createShowingDto.movie.id,
                    createShowingDto.room.id,
                ],
            );
            const numberOfSeats = createShowingDto.room.numberOfSeats;
            const accessibleSeat = Math.ceil(numberOfSeats * 0.1);
            for (let i = 1; i <= numberOfSeats; i++) {
                const seatId = uuidv4();

                await queryRunner.query(
                    `INSERT INTO seat(id, number, accessibleSeat, reserved, showingId) VALUES (?, ?, ?, ?, ? )`,
                    [seatId, i, i <= accessibleSeat, false, showingId],
                );
            }
            await queryRunner.commitTransaction();
            return createShowing;
        } catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        } finally {
            await queryRunner.release();
        }
    }

    async findAll() {
        return await this.showingRepository.find({
            relations: {
                movie: true,
                room: {
                    cinema: true,
                    projectionQuality: { price: true },
                },
                seat: true,
            },
        });
    }

    async findOne(id: string) {
        return await this.showingRepository.findOne({
            relations: {
                room: { cinema: true },
                movie: true,
            },
            where: { id },
        });
    }

    async findShowingByRoomId(id: string) {
        return await this.showingRepository.find({
            where: { room: { id: id } },
            relations: { room: true },
        });
    }

    async update(id: string, updateShowingDto: UpdateShowingDto) {
        return await this.showingRepository.update(
            { id },
            {
                date: updateShowingDto.date,
                startAt: updateShowingDto.startAt,
                endAt: updateShowingDto.endAt,
                movie: updateShowingDto.movie,
                room: updateShowingDto.room,
            },
        );
    }

    async remove(id: string) {
        return await this.showingRepository.delete({ id });
    }
}
