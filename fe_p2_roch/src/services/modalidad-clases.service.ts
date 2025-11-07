import axios from 'axios'
import type { ModalidadClase } from '@/models/modalidad-clase'

const URL_API = 'http://localhost:3000/api/modalidad-clases'

export const obtenerModalidadClases = async (): Promise<ModalidadClase[]> => {
  const response = await axios.get(URL_API)
  return response.data
}

export const obtenerModalidadClase = async (id: number): Promise<ModalidadClase> => {
  const response = await axios.get(`${URL_API}/${id}`)
  return response.data
}

export const crearModalidadClase = async (modalidadClase: ModalidadClase): Promise<ModalidadClase> => {
  const response = await axios.post(URL_API, modalidadClase)
  return response.data
}

export const actualizarModalidadClase = async (
  id: number,
  modalidadClase: ModalidadClase
): Promise<ModalidadClase> => {
  const response = await axios.patch(`${URL_API}/${id}`, modalidadClase)
  return response.data
}

export const eliminarModalidadClase = async (id: number): Promise<boolean> => {
  const response = await axios.delete(`${URL_API}/${id}`)
  return response.status === 200
}