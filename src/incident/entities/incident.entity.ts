import { Room } from '../../room/entities/room.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Incident {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar')
    description: string;

    @Column()
    date: Date;

    @ManyToOne(() => Room, (room) => room.incident)
    room: Room;
}
