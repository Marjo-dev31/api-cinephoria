import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Review {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    description: string;

    @Column('int')
    grade: number;

    @Column({ default: false })
    is_Validated: boolean;
}
