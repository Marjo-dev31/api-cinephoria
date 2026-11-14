import { Movie } from '../../movies/entities/movie.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Genre {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column('varchar')
    title!: string;

    @OneToMany(() => Movie, (movie) => movie.genre)
    movie!: Movie[];
}
