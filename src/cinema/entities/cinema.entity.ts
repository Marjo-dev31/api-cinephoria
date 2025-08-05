import { Room } from 'src/room/entities/room.entity';
import { Country } from '../../country/entities/country.entity';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Cinema {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    city: string;

    @ManyToOne(() => Country, (country) => country.id, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'coutryId' })
    country: Country;

    @OneToMany(() => Room, (room) => room.id)
    room: Room[];
}
