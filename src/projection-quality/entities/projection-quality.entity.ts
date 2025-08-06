import { Room } from '../../room/entities/room.entity';
import { Price } from '../../pricelist/entities/price.entity';
import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ProjectionQuality {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    quality: string;

    @ManyToOne(() => Price, (price) => price.projectionQuality, {
        onDelete: 'SET NULL',
    })
    price: Price;

    @OneToMany(() => Room, (room) => room.projectionQuality)
    room: Room[];
}
