import {
    BadRequestException,
    Inject,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { USER_REPOSITORY } from './constants';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { loginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
    constructor(
        @Inject(USER_REPOSITORY)
        private userRepository: Repository<User>,
        private jwtService: JwtService,
    ) {}

    async create(createUserDto: CreateUserDto) {
        try {
            const hashPassword = await bcrypt.hash(createUserDto.password, 10);
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
        return await this.userRepository.find({ relations: { role: true } });
    }

    async findOne(id: string) {
        return await this.userRepository.findOneBy({ id });
    }

    async findOneByEmail(mail: string) {
        return this.userRepository.findOne({
            where: { mail },
            relations: { role: true },
        });
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        if (updateUserDto.password) {
            const hashPassword = await bcrypt.hash(updateUserDto.password, 10);
            return await this.userRepository.update(
                { id },
                {
                    firstname: updateUserDto.firstname,
                    lastname: updateUserDto.lastname,
                    password: hashPassword,
                    mail: updateUserDto.mail,
                    username: updateUserDto.username,
                },
            );
        }
    }

    async remove(id: string) {
        return await this.userRepository.delete({ id });
    }

    async login(loginUser: loginUserDto) {
        const user = await this.findOneByEmail(loginUser.mail);
        if (!user) {
            throw new NotFoundException('Email ou mot de passe invalide');
        }
        const isMatch = await bcrypt.compare(loginUser.password, user.password);
        if (!isMatch) {
            throw new NotFoundException('Email ou mot de passe invalide');
        }
        const accessToken = await this.createJwt(user);
        return { ...user, access_token: accessToken };
    }

    async createJwt(user: User) {
        const payload = {
            id: user.id,
            email: user.mail,
            role: user.role,
        };
        return await this.jwtService.signAsync(payload);
    }
}
