import { Showing } from '../../showing/entities/showing.entity';
import { Cinema } from '../../cinema/entities/cinema.entity';
import { ProjectionQuality } from '../../projection-quality/entities/projection-quality.entity';
import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Room {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    number: number;

    @Column()
    numberOfSeats: number;

    @ManyToOne(() => Cinema, (cinema) => cinema.room, { onDelete: 'CASCADE' })
    cinema: Cinema;

    @ManyToOne(() => ProjectionQuality, (quality) => quality.room, {
        onDelete: 'SET NULL',
    })
    projectionQuality: ProjectionQuality;

    @OneToMany(() => Showing, (showing) => showing.room)
    showing: Showing[];
}
