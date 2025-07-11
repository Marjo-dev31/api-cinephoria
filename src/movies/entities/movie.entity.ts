import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Genre } from '../../genre/entities/genre.entity';
import { Review } from '../../reviews/entities/review.entity';

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

    @Column('int', { default: 0 })
    minimun_Age: number;

    @Column({ default: false })
    is_Favorite: boolean;

    @CreateDateColumn()
    create_At: Date;

    @ManyToOne(() => Genre, (genre) => genre.id, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'genreId' })
    genre: Genre;

    @OneToMany(() => Review, (review) => review.movie)
    reviews: Review[];
}
