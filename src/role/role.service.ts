import { Inject, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ROLE_REPOSITORY } from './constants';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';

@Injectable()
export class RoleService {
    constructor(
        @Inject(ROLE_REPOSITORY)
        private roleRepository: Repository<Role>,
    ) {}

    async create(createRoleDto: CreateRoleDto) {
        const newRole = this.roleRepository.create(createRoleDto);
        return await this.roleRepository.save(newRole);
    }

    async findAll() {
        return await this.roleRepository.find();
    }

    async findOne(id: string) {
        return await this.roleRepository.findOneBy({ id });
    }

    async update(id: string, updateRoleDto: UpdateRoleDto) {
        return await this.roleRepository.update(
            { id },
            { name: updateRoleDto.name },
        );
    }

    async remove(id: string) {
        return await this.roleRepository.delete({ id });
    }
}
