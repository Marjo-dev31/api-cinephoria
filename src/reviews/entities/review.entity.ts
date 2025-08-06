import { Movie } from '../../movies/entities/movie.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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

    @ManyToOne(() => Movie, (movie) => movie.reviews, { onDelete: 'CASCADE' })
    movie: Movie;
}
