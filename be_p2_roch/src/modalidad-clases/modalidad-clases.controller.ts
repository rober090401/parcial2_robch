import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ModalidadClasesService } from './modalidad-clases.service';
import { CreateModalidadClaseDto } from './dto/create-modalidad-clase.dto';
import { UpdateModalidadClaseDto } from './dto/update-modalidad-clase.dto';
import { ModalidadClase } from './entities/modalidad-clase.entity';

@ApiTags('modalidad-clases')
@Controller('modalidad-clases')
export class ModalidadClasesController {
  constructor(
    private readonly modalidadClasesService: ModalidadClasesService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear nueva modalidad de clase' })
  @ApiResponse({
    status: 201,
    description: 'La modalidad de clase fue creada con éxito',
    type: ModalidadClase,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  create(@Body() createModalidadClaseDto: CreateModalidadClaseDto) {
    return this.modalidadClasesService.create(createModalidadClaseDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener lista de modalidades de clase' })
  @ApiResponse({
    status: 200,
    description: 'Lista de modalidades de clase',
    type: [ModalidadClase],
  })
  findAll() {
    return this.modalidadClasesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una modalidad de clase por ID' })
  @ApiResponse({
    status: 200,
    description: 'Modalidad de clase encontrada',
    type: ModalidadClase,
  })
  @ApiResponse({ status: 404, description: 'Modalidad de clase no encontrada' })
  findOne(@Param('id') id: string) {
    return this.modalidadClasesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una modalidad de clase' })
  @ApiResponse({
    status: 200,
    description: 'La modalidad de clase fue actualizada con éxito',
    type: ModalidadClase,
  })
  @ApiResponse({ status: 404, description: 'Modalidad de clase no encontrada' })
  update(
    @Param('id') id: string,
    @Body() updateModalidadClaseDto: UpdateModalidadClaseDto,
  ) {
    return this.modalidadClasesService.update(+id, updateModalidadClaseDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una modalidad de clase' })
  @ApiResponse({
    status: 200,
    description: 'La modalidad de clase fue eliminada con éxito',
  })
  @ApiResponse({ status: 404, description: 'Modalidad de clase no encontrada' })
  remove(@Param('id') id: string) {
    return this.modalidadClasesService.remove(+id);
  }
}
