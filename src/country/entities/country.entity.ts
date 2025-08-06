import { Cinema } from '../../cinema/entities/cinema.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Country {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @OneToMany(() => Cinema, (cinema) => cinema.country)
    cinema: Cinema[];
}
