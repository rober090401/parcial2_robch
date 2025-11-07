import type { NivelAcademico } from './nivel-academico'
import type { ModalidadClase } from './modalidad-clase'

export interface Programa {
  id: number
  idNivelAcademico: number
  idModalidadClase: number
  nombre: string
  descripcion: string
  version: number
  duracionMeses: number
  costo: number
  fechaInicio: Date | string
  estado: 'En Planificación' | 'En curso' | 'Finalizado'
  nivelAcademico?: NivelAcademico
  modalidadClase?: ModalidadClase
  fechaCreacion?: Date
  fechaModificacion?: Date
}
