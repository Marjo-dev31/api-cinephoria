import { Seat } from '../../seat/entities/seat.entity';
import { Showing } from '../../showing/entities/showing.entity';
import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    quantity: number;

    @Column('decimal', { precision: 10, scale: 2 })
    total: number;

    @ManyToOne(() => Showing, (showing) => showing.order, {
        onDelete: 'SET NULL',
    })
    showing: Showing;

    @OneToMany(() => Seat, (seat) => seat.order)
    seat: Seat[];

    // @ManyToOne(() => User, (user) => user.order, { onDelete: 'CASCADE' })
    // order: User;
}
