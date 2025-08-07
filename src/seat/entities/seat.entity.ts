import { Showing } from '../../showing/entities/showing.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Seat {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    number: number;

    @Column({ default: false })
    accessibleSeat: boolean;

    @Column({ default: false })
    reserved: boolean;

    @ManyToOne(() => Showing, (showing) => showing.seat)
    showing: Showing;
}
