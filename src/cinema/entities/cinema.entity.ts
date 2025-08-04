import { Country } from '../../country/entities/country.entity';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
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
}
