import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { USER_REPOSITORY } from './constants';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @Inject(USER_REPOSITORY)
        private userRepository: Repository<User>,
    ) {}

    async create(createUserDto: CreateUserDto) {
        try {
            const hashPassword: string = await bcrypt.hash(
                createUserDto.password,
                10,
            );
            const secureUser = {
                ...createUserDto,
                password: hashPassword,
            };
            const newUser = this.userRepository.create(secureUser);
            return await this.userRepository.save(newUser);
        } catch {
            throw new BadRequestException();
        }
    }

    async findAll() {
        return await this.userRepository.find();
    }

    async findOne(id: string) {
        return await this.userRepository.findOneBy({ id });
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        return await this.userRepository.update(
            { id },
            {
                firstname: updateUserDto.firstname,
                lastname: updateUserDto.lastname,
                password: updateUserDto.password,
                mail: updateUserDto.mail,
                username: updateUserDto.username,
            },
        );
    }

    async remove(id: string) {
        return await this.userRepository.delete({ id });
    }
}
