export interface ModalidadClase {
  id: number;
  nombre: string;
  descripcion: string;
  tipo: 'PRESENCIAL' | 'VIRTUAL' | 'MIXTO';
  nivel: 'DOCTORADO' | 'DIPLOMADO' | 'ESPECIALIDAD' | 'MAESTRIA';
  fecha_creacion: Date;
  fecha_modificacion: Date;
  fecha_eliminacion?: Date;
}