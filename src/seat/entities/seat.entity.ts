import { Room } from '../../room/entities/room.entity';
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

    @ManyToOne(() => Room, (room) => room.seat, { onDelete: 'CASCADE' })
    room: Room;
}
