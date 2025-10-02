import {
    Column,
    CreateDateColumn,
    Entity,
    ObjectId,
    ObjectIdColumn,
} from 'typeorm';

@Entity('movies')
export class MovieMongo {
    @ObjectIdColumn()
    _id: ObjectId;

    @Column()
    title: string;

    @Column({ default: 0 })
    nbOfSales: number;

    @CreateDateColumn()
    create_At: Date;
}
