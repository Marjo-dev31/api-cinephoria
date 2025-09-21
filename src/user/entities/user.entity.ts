import { IsEmail, Min } from 'class-validator';
import { Role } from '../../role/entities/role.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column({ unique: true })
    @IsEmail()
    mail: string;

    @Column()
    @Min(12)
    password: string;

    @Column()
    username: string;

    @ManyToOne(() => Role, (role) => role.name, { onDelete: 'SET NULL' })
    role: Role;
}
