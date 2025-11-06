import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsDefined,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateProgramaDto {
  @ApiProperty()
  @IsDefined({ message: 'El campo id del nivel académico debe estar definido' })
  @IsInt({ message: 'El campo id del nivel académico debe ser numérico' })
  idNivelAcademico: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo nombre es obligatorio' })
  @IsString({ message: 'El campo nombre debe ser de tipo cadena' })
  @MaxLength(100, { message: 'El campo nombre no debe exceder los 100 caracteres' })
  @Transform(({ value }): string | undefined => (typeof value === 'string' ? value.trim() : value))
  readonly nombre: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo descripción es obligatorio' })
  @IsString({ message: 'El campo descripción debe ser de tipo cadena' })
  @MaxLength(2000, { message: 'El campo descripción no debe exceder los 2000 caracteres' })
  @Transform(({ value }): string | undefined => (typeof value === 'string' ? value.trim() : value))
  readonly descripcion: string;

  @ApiProperty()
  @IsDefined({ message: 'El campo versión debe estar definido' })
  @IsInt({ message: 'El campo versión debe ser un número entero' })
  @Min(1, { message: 'El campo versión debe ser mayor a 0' })
  readonly version: number;

  @ApiProperty()
  @IsDefined({ message: 'El campo duración en meses debe estar definido' })
  @IsInt({ message: 'El campo duración en meses debe ser un número entero' })
  @Min(1, { message: 'El campo duración en meses debe ser mayor a 0' })
  readonly duracionMeses: number;

  @ApiProperty()
  @IsDefined({ message: 'El campo costo debe estar definido' })
  @IsNumber({}, { message: 'El campo costo debe ser numérico' })
  @Min(0, { message: 'El campo costo debe ser mayor o igual a 0' })
  readonly costo: number;

  @ApiProperty()
  @IsDefined({ message: 'El campo fecha de inicio debe estar definido' })
  @IsDateString({}, { message: 'El campo fecha de inicio debe ser una fecha válida' })
  readonly fechaInicio: Date;

  @ApiProperty({ enum: ['En Planificación', 'En curso', 'Finalizado'] })
  @IsNotEmpty({ message: 'El campo estado es obligatorio' })
  @IsEnum(['En Planificación', 'En curso', 'Finalizado'], {
    message: 'El campo estado debe ser: En Planificación, En curso o Finalizado',
  })
  readonly estado: string;
}
