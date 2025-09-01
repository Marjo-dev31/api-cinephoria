import { Seat } from '../../seat/entities/seat.entity';
import { Movie } from '../../movies/entities/movie.entity';
import { Room } from '../../room/entities/room.entity';
import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from '../../order/entities/order.entity';

@Entity()
export class Showing {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'datetime' })
    date: Date;

    @Column({ type: 'time' })
    startAt: string;

    @Column({ type: 'time' })
    endAt: string;

    @ManyToOne(() => Movie, (movie) => movie.showing)
    movie: Movie;

    @ManyToOne(() => Room, (room) => room.showing)
    room: Room;

    @OneToMany(() => Seat, (seat) => seat.showing)
    seat: Seat[];

    @OneToMany(() => Order, (order) => order.showing)
    order: Order[];
}
