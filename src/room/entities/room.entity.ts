import { Cinema } from 'src/cinema/entities/cinema.entity';
import { ProjectionQuality } from 'src/projection-quality/entities/projection-quality.entity';
import { Seat } from 'src/seat/entities/seat.entity';
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

    @ManyToOne(() => Cinema, (cinema) => cinema.id, { onDelete: 'SET NULL' })
    cinema: Cinema;

    @ManyToOne(() => ProjectionQuality, (quality) => quality.id, {
        onDelete: 'SET NULL',
    })
    quality: ProjectionQuality;

    @OneToMany(() => Seat, (seat) => seat.id)
    seat: Seat[];
}
