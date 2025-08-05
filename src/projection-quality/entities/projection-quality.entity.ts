import { Room } from 'src/room/entities/room.entity';
import { Price } from '../../pricelist/entities/price.entity';
import {
    Column,
    Entity,
    JoinColumn,
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

    @ManyToOne(() => Price, (price) => price.id, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'priceId' })
    price: Price;

    @OneToMany(() => Room, (room) => room.id)
    room: Room[];
}
