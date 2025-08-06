import { Room } from '../../room/entities/room.entity';
import { Country } from '../../country/entities/country.entity';
import {
    Column,
    Entity,
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

    @ManyToOne(() => Country, (country) => country.cinema, {
        onDelete: 'SET NULL',
    })
    country: Country;

    @OneToMany(() => Room, (room) => room.cinema)
    room: Room[];
}
