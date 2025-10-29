import { Inject, Injectable } from '@nestjs/common';
import { CreateIncidentDto } from './dto/create-incident.dto';
import { INCIDENT_REPOSITORY } from './constants';
import { Repository } from 'typeorm';
import { Incident } from './entities/incident.entity';

@Injectable()
export class IncidentService {
    constructor(
        @Inject(INCIDENT_REPOSITORY)
        private readonly incidentRepository: Repository<Incident>,
    ) {}

    async create(createIncidentDto: CreateIncidentDto) {
        const newIncident = this.incidentRepository.create(createIncidentDto);
        return await this.incidentRepository.save(newIncident);
    }

    async findAll() {
        return await this.incidentRepository.find({
            relations: { room: { cinema: true } },
        });
    }

    // findOne(id: number) {
    //     return `This action returns a #${id} incident`;
    // }

    // update(id: number, updateIncidentDto: UpdateIncidentDto) {
    //     return `This action updates a #${id} incident`;
    // }

    // remove(id: number) {
    //     return `This action removes a #${id} incident`;
    // }
}
