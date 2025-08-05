import { ProjectionQuality } from '../../projection-quality/entities/projection-quality.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Price {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('decimal', { precision: 10, scale: 2 })
    price: number;

    @OneToMany(
        () => ProjectionQuality,
        (projectionQuality) => projectionQuality.id,
    )
    projectionQuality: ProjectionQuality[];
}
