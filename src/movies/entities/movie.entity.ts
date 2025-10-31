import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Genre } from '../../genre/entities/genre.entity';
import { Review } from '../../reviews/entities/review.entity';
import { Showing } from '../../showing/entities/showing.entity';

@Entity()
export class Movie {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column('text')
    description: string;

    @Column({ default: '' })
    image_Url: string;

    @Column('int', { default: 0 })
    minimum_Age: number;

    @Column({ default: false })
    is_Favorite: boolean;

    @CreateDateColumn()
    create_At: Date;

    @ManyToOne(() => Genre, (genre) => genre.movie, { onDelete: 'SET NULL' })
    genre: Genre;

    @OneToMany(() => Review, (review) => review.movie)
    reviews: Review[];

    @OneToMany(() => Showing, (showing) => showing.movie)
    showing: Showing[];
}
