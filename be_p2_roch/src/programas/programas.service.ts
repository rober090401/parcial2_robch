import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProgramaDto } from './dto/create-programa.dto';
import { UpdateProgramaDto } from './dto/update-programa.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Programa } from './entities/programa.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProgramasService {
  constructor(
    @InjectRepository(Programa)
    private programasRepository: Repository<Programa>,
  ) {}

  async create(createProgramaDto: CreateProgramaDto): Promise<Programa> {
    const existe = await this.programasRepository.findOneBy({
      nombre: createProgramaDto.nombre.trim(),
      version: createProgramaDto.version,
    });
    if (existe) throw new ConflictException('El programa con esta versión ya existe');

    const programa = new Programa();
    Object.assign(programa, createProgramaDto);
    return this.programasRepository.save(programa);
  }

  async findAll(): Promise<Programa[]> {
    return this.programasRepository.find({
      relations: ['nivelAcademico'],
      order: {
        nivelAcademico: { nombre: 'ASC' },
        nombre: 'ASC',
      },
    });
  }

  async findOne(id: number): Promise<Programa> {
    const programa = await this.programasRepository.findOne({
      where: { id },
      relations: ['nivelAcademico'],
    });
    if (!programa) throw new NotFoundException('El programa no existe');
    return programa;
  }

  async update(id: number, updateProgramaDto: UpdateProgramaDto): Promise<Programa> {
    const programa = await this.findOne(id);
    Object.assign(programa, updateProgramaDto);
    return this.programasRepository.save(programa);
  }

  async remove(id: number): Promise<Programa> {
    const programa = await this.findOne(id);
    return this.programasRepository.softRemove(programa);
  }
}
