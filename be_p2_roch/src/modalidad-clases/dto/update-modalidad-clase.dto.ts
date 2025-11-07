import { PartialType } from '@nestjs/mapped-types';
import { CreateModalidadClaseDto } from './create-modalidad-clase.dto';

export class UpdateModalidadClaseDto extends PartialType(
  CreateModalidadClaseDto,
) {}
