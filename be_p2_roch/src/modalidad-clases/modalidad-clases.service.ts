import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateModalidadClaseDto } from './dto/create-modalidad-clase.dto';
import { UpdateModalidadClaseDto } from './dto/update-modalidad-clase.dto';
import { ModalidadClase } from './entities/modalidad-clase.entity';

@Injectable()
export class ModalidadClasesService {
  constructor(
    @InjectRepository(ModalidadClase)
    private modalidadClaseRepository: Repository<ModalidadClase>,
  ) {}

  async create(createModalidadClaseDto: CreateModalidadClaseDto) {
    const modalidadClase = this.modalidadClaseRepository.create(
      createModalidadClaseDto,
    );
    await this.modalidadClaseRepository.save(modalidadClase);
    return modalidadClase;
  }

  async findAll() {
    return await this.modalidadClaseRepository.find({
      order: { nombre: 'ASC' },
    });
  }

  async findOne(id: number) {
    const modalidadClase = await this.modalidadClaseRepository.findOneBy({
      id,
    });
    if (!modalidadClase)
      throw new NotFoundException(
        `Modalidad de clase con id ${id} no encontrada`,
      );
    return modalidadClase;
  }

  async update(id: number, updateModalidadClaseDto: UpdateModalidadClaseDto) {
    const modalidadClase = await this.modalidadClaseRepository.preload({
      id: id,
      ...updateModalidadClaseDto,
    });
    if (!modalidadClase)
      throw new NotFoundException(
        `Modalidad de clase con id ${id} no encontrada`,
      );
    await this.modalidadClaseRepository.save(modalidadClase);
    return modalidadClase;
  }

  async remove(id: number) {
    const modalidadClase = await this.findOne(id);
    await this.modalidadClaseRepository.softDelete(id);
    return modalidadClase;
  }
}
