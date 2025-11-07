import { Programa } from 'src/programas/entities/programa.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('modalidad_clases')
export class ModalidadClase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 50, nullable: false })
  nombre: string;

  @Column('varchar', { length: 1000, nullable: true })
  descripcion: string;

  @Column('enum', {
    enum: ['PRESENCIAL', 'VIRTUAL', 'MIXTO'],
    default: 'PRESENCIAL',
  })
  tipo: string;

  @Column('enum', {
    enum: ['DOCTORADO', 'DIPLOMADO', 'ESPECIALIDAD', 'MAESTRIA'],
    default: 'MAESTRIA',
  })
  nivel: string;

  @CreateDateColumn()
  fecha_creacion: Date;

  @UpdateDateColumn()
  fecha_modificacion: Date;

  @DeleteDateColumn()
  fecha_eliminacion: Date;

  @OneToMany(() => Programa, (programa) => programa.modalidadClase)
  programas: Programa[];
}
