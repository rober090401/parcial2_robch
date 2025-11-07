import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateModalidadClaseDto {
  @ApiProperty({
    description: 'Nombre de la modalidad de clase',
    maxLength: 50,
    required: true,
  })
  @IsString({ message: 'El campo nombre debe ser de tipo cadena' })
  @IsNotEmpty({ message: 'El campo nombre es requerido' })
  @MaxLength(50, {
    message: 'El campo nombre no debe ser mayor a 50 caracteres',
  })
  readonly nombre: string;

  @ApiProperty({
    description: 'Descripción de la modalidad de clase',
    maxLength: 1000,
    required: false,
  })
  @IsString({ message: 'El campo descripción debe ser de tipo cadena' })
  @IsOptional()
  @MaxLength(1000, {
    message: 'El campo descripción no debe ser mayor a 1000 caracteres',
  })
  readonly descripcion: string;

  @ApiProperty({
    description: 'Tipo de modalidad',
    enum: ['PRESENCIAL', 'VIRTUAL', 'MIXTO'],
    default: 'PRESENCIAL',
    required: true,
  })
  @IsString({ message: 'El campo tipo debe ser de tipo cadena' })
  @IsNotEmpty({ message: 'El campo tipo es requerido' })
  readonly tipo: string;

  @ApiProperty({
    description: 'Nivel académico',
    enum: ['DOCTORADO', 'DIPLOMADO', 'ESPECIALIDAD', 'MAESTRIA'],
    default: 'MAESTRIA',
    required: true,
  })
  @IsString({ message: 'El campo nivel debe ser de tipo cadena' })
  @IsNotEmpty({ message: 'El campo nivel es requerido' })
  readonly nivel: string;
}
