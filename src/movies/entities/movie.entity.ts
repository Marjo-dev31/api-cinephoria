import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Movie {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column('text')
    description: string;

    @Column()
    image_Url: string;

    @Column('int')
    minimun_Age: number;

    @Column({ default: false })
    is_Favorite: boolean;

    @CreateDateColumn()
    create_At: Date;
}
