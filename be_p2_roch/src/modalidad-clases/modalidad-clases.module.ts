import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModalidadClasesService } from './modalidad-clases.service';
import { ModalidadClasesController } from './modalidad-clases.controller';
import { ModalidadClase } from './entities/modalidad-clase.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ModalidadClase])],
  controllers: [ModalidadClasesController],
  providers: [ModalidadClasesService],
  exports: [ModalidadClasesService],
})
export class ModalidadClasesModule {}