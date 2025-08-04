import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Price {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    price: number;

    // @OneToMany(()=>)
}
