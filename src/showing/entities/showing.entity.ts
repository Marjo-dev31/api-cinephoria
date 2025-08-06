import { Movie } from '../../movies/entities/movie.entity';
import { Room } from '../../room/entities/room.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Showing {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'datetime' })
    date: Date;

    @Column({ type: 'time' })
    startAt: string;

    @Column({ type: 'time' })
    endAt: string;

    @ManyToOne(() => Movie, (movie) => movie.id)
    movie: Movie;

    @ManyToOne(() => Room, (room) => room.id)
    room: Room;
}
