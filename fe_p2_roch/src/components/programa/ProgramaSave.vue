<script setup lang="ts">
import type { NivelAcademico } from '@/models/nivel-academico'
import type { Programa } from '@/models/programa'
import type { ModalidadClase } from '@/models/modalidad-clase'
import axios from 'axios'
import { computed, onMounted, ref, watch } from 'vue'

const API_URL_PROGRAMAS = 'http://localhost:3000/api/v1/programas'
const API_URL_NIVELES = 'http://localhost:3000/api/v1/niveles-academicos'
const API_URL_MODALIDADES = 'http://localhost:3000/api/v1/modalidad-clases'

const props = defineProps({
  mostrar: Boolean,
  programa: {
    type: Object as () => Programa,
    default: () => ({}) as Programa
  },
  modoEdicion: Boolean
})

const emit = defineEmits(['guardar', 'close'])

const dialogVisible = computed({
  get: () => props.mostrar,
  set: (value) => {
    if (!value) emit('close')
  }
})

const nivelesAcademicos = ref<NivelAcademico[]>([])
const modalidadesClases = ref<ModalidadClase[]>([])
const programa = ref<Programa>({ ...props.programa } as Programa)

watch(
  () => props.programa,
  (newVal) => {
    programa.value = { ...newVal } as Programa
  }
)

async function obtenerNiveles() {
  try {
    const response = await axios.get(API_URL_NIVELES)
    nivelesAcademicos.value = response.data
  } catch (error) {
    console.error('Error al obtener niveles académicos:', error)
  }
}

async function obtenerModalidades() {
  try {
    const response = await axios.get(API_URL_MODALIDADES)
    modalidadesClases.value = response.data
  } catch (error) {
    console.error('Error al obtener modalidades de clase:', error)
  }
}

async function handleSave() {
  try {
    const body = {
      idNivelAcademico: Number(programa.value.idNivelAcademico),
      idModalidadClase: Number(programa.value.idModalidadClase),
      nombre: programa.value.nombre,
      descripcion: programa.value.descripcion,
      version: Number(programa.value.version),
      duracionMeses: Number(programa.value.duracionMeses),
      costo: Number(programa.value.costo),
      fechaInicio: programa.value.fechaInicio,
      estado: programa.value.estado
    }

    if (props.modoEdicion) {
      await axios.patch(`${API_URL_PROGRAMAS}/${programa.value.id}`, body)
    } else {
      await axios.post(API_URL_PROGRAMAS, body)
    }

    emit('guardar')
    programa.value = {} as Programa
    dialogVisible.value = false
  } catch (error: any) {
    alert(error?.response?.data?.message || 'Error al guardar')
  }
}

watch(
  () => props.mostrar,
  (nuevoValor) => {
    if (nuevoValor) {
      obtenerNiveles()
      obtenerModalidades()

      if (props.programa?.id) {
        programa.value = { ...props.programa }
        // Convertir fecha para el input type="date"
        if (programa.value.fechaInicio) {
          const fecha =
            typeof programa.value.fechaInicio === 'string'
              ? programa.value.fechaInicio.split('T')[0]
              : new Date(programa.value.fechaInicio).toISOString().split('T')[0]
          programa.value.fechaInicio = fecha as any
        }
      } else {
        programa.value = {
          idNivelAcademico: 0,
          idModalidadClase: 0,
          nombre: '',
          descripcion: '',
          version: 1,
          duracionMeses: 12,
          costo: 0,
          fechaInicio: '',
          estado: 'En Planificación'
        } as any
      }
    }
  }
)

onMounted(() => {
  if (props.mostrar) {
    obtenerNiveles()
    obtenerModalidades()
  }
})
</script>

<template>
  <div v-if="dialogVisible" class="modal-overlay" @click="dialogVisible = false">
    <div class="modal-content" @click.stop>
      <h3>{{ props.modoEdicion ? 'Editar' : 'Crear' }} Programa</h3>

      <form @submit.prevent="handleSave">
        <div class="form-group">
          <label for="nivelAcademico">Nivel Académico*</label>
          <select id="nivelAcademico" v-model="programa.idNivelAcademico" required>
            <option value="" disabled>Seleccione un nivel</option>
            <option v-for="nivel in nivelesAcademicos" :key="nivel.id" :value="nivel.id">
              {{ nivel.nombre }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label for="modalidadClase">Modalidad de Clase*</label>
          <select id="modalidadClase" v-model="programa.idModalidadClase" required>
            <option value="" disabled>Seleccione una modalidad</option>
            <option v-for="modalidad in modalidadesClases" :key="modalidad.id" :value="modalidad.id">
              {{ modalidad.nombre }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label for="nombre">Nombre del Programa*</label>
          <input
            id="nombre"
            v-model="programa.nombre"
            type="text"
            required
            maxlength="100"
            placeholder="Ej: Maestría en Desarrollo Web"
          />
        </div>

        <div class="form-group">
          <label for="descripcion">Descripción*</label>
          <textarea
            id="descripcion"
            v-model="programa.descripcion"
            rows="3"
            required
            maxlength="2000"
            placeholder="Descripción del programa"
          ></textarea>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="version">Versión*</label>
            <input
              id="version"
              v-model="programa.version"
              type="number"
              required
              min="1"
              placeholder="1"
            />
          </div>

          <div class="form-group">
            <label for="duracionMeses">Duración (meses)*</label>
            <input
              id="duracionMeses"
              v-model="programa.duracionMeses"
              type="number"
              required
              min="1"
              placeholder="12"
            />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="costo">Costo (Bs.)*</label>
            <input
              id="costo"
              v-model="programa.costo"
              type="number"
              required
              min="0"
              step="0.01"
              placeholder="0.00"
            />
          </div>

          <div class="form-group">
            <label for="fechaInicio">Fecha de Inicio*</label>
            <input id="fechaInicio" v-model="programa.fechaInicio" type="date" required />
          </div>
        </div>

        <div class="form-group">
          <label for="estado">Estado*</label>
          <select id="estado" v-model="programa.estado" required>
            <option value="En Planificación">📅 En Planificación</option>
            <option value="En curso">🎓 En curso</option>
            <option value="Finalizado">✅ Finalizado</option>
          </select>
        </div>

        <div class="modal-actions">
          <button type="button" class="btn btn-secondary" @click="dialogVisible = false">
            Cancelar
          </button>
          <button type="submit" class="btn btn-primary">
            {{ props.modoEdicion ? 'Actualizar' : 'Guardar' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  overflow-y: auto;
}

.modal-content {
  background: var(--vt-c-black-soft);
  padding: 30px;
  border-radius: 8px;
  max-width: 600px;
  width: 90%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  margin: 20px;
  max-height: 90vh;
  overflow-y: auto;
  border: 1px solid var(--vt-c-divider-dark-1);
}

.modal-content h3 {
  margin-top: 0;
  margin-bottom: 20px;
  color: var(--vt-c-green);
}

.form-group {
  margin-bottom: 20px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: var(--color-heading);
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 10px;
  background-color: var(--vt-c-black-mute);
  border: 1px solid var(--vt-c-divider-dark-1);
  border-radius: 4px;
  font-size: 14px;
  font-family: inherit;
  color: var(--color-text);
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  outline: none;
  border-color: var(--vt-c-green);
}

.modal-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 20px;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: background-color 0.3s;
}

.btn-primary {
  background-color: var(--vt-c-green);
  color: var(--vt-c-black);
}

.btn-primary:hover {
  background-color: var(--vt-c-green-dark);
}

.btn-secondary {
  background-color: var(--vt-c-black-mute);
  color: var(--color-text);
  border: 1px solid var(--vt-c-divider-dark-1);
}

.btn-secondary:hover {
  background-color: var(--vt-c-black);
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>
