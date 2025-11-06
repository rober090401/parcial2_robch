import axios from 'axios'
import type { Programa } from '@/models/programa'

const API_URL = 'http://localhost:3000/api/v1/programas'

export const programasService = {
  async getAll(): Promise<Programa[]> {
    const response = await axios.get(API_URL)
    return response.data
  },

  async getById(id: number): Promise<Programa> {
    const response = await axios.get(`${API_URL}/${id}`)
    return response.data
  },

  async create(programa: Omit<Programa, 'id'>): Promise<Programa> {
    const response = await axios.post(API_URL, programa)
    return response.data
  },

  async update(id: number, programa: Partial<Programa>): Promise<Programa> {
    const response = await axios.patch(`${API_URL}/${id}`, programa)
    return response.data
  },

  async delete(id: number): Promise<void> {
    await axios.delete(`${API_URL}/${id}`)
  }
}
