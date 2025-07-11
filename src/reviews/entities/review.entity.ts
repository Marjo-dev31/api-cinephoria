import { Movie } from '../../movies/entities/movie.entity';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

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

    @ManyToOne(() => Movie, (movie) => movie.id, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'movieId' })
    movie: Movie;
}
