import axios from 'axios'
import type { NivelAcademico } from '@/models/nivel-academico'

const API_URL = 'http://localhost:3000/api/v1/niveles-academicos'

export const nivelesAcademicosService = {
  async getAll(): Promise<NivelAcademico[]> {
    const response = await axios.get(API_URL)
    return response.data
  },

  async getById(id: number): Promise<NivelAcademico> {
    const response = await axios.get(`${API_URL}/${id}`)
    return response.data
  },

  async create(nivelAcademico: Omit<NivelAcademico, 'id'>): Promise<NivelAcademico> {
    const response = await axios.post(API_URL, nivelAcademico)
    return response.data
  },

  async update(id: number, nivelAcademico: Partial<NivelAcademico>): Promise<NivelAcademico> {
    const response = await axios.patch(`${API_URL}/${id}`, nivelAcademico)
    return response.data
  },

  async delete(id: number): Promise<void> {
    await axios.delete(`${API_URL}/${id}`)
  }
}
