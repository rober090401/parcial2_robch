<script setup lang="ts">
import type { Programa } from '@/models/programa'
import axios from 'axios'
import { computed, onMounted, ref } from 'vue'

const API_URL = 'http://localhost:3000/api/v1/programas'

const programas = ref<Programa[]>([])
const programaDelete = ref<Programa | null>(null)
const mostrarConfirmDialog = ref<boolean>(false)
const busqueda = ref<string>('')
const emit = defineEmits(['edit'])

const programasFiltrados = computed(() => {
  return programas.value.filter(
    (programa) =>
      programa.nombre.toLowerCase().includes(busqueda.value.toLowerCase()) ||
      programa.nivelAcademico?.nombre.toLowerCase().includes(busqueda.value.toLowerCase()) ||
      programa.modalidadClase?.nombre.toLowerCase().includes(busqueda.value.toLowerCase())
  )
})

async function obtenerLista() {
  try {
    const response = await axios.get(API_URL)
    programas.value = response.data
  } catch (error) {
    console.error('Error al obtener programas:', error)
  }
}

function emitirEdicion(programa: Programa) {
  emit('edit', programa)
}

function mostrarEliminarConfirm(programa: Programa) {
  programaDelete.value = programa
  mostrarConfirmDialog.value = true
}

async function eliminar() {
  if (programaDelete.value) {
    try {
      await axios.delete(`${API_URL}/${programaDelete.value.id}`)
      obtenerLista()
    } catch (error) {
      console.error('Error al eliminar:', error)
    }
  }
  mostrarConfirmDialog.value = false
}

function getEstadoBadge(estado: string) {
  const badges: any = {
    'En Planificación': { class: 'badge-planificacion', text: '📅 En Planificación' },
    'En curso': { class: 'badge-curso', text: '🎓 En curso' },
    Finalizado: { class: 'badge-finalizado', text: '✅ Finalizado' }
  }
  return badges[estado] || { class: '', text: estado }
}

onMounted(() => {
  obtenerLista()
})

defineExpose({ obtenerLista })
</script>

<template>
  <div>
    <div class="search-box">
      <input
        v-model="busqueda"
        type="text"
        placeholder="Buscar por nombre o nivel académico..."
        class="search-input"
      />
    </div>

    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Nro.</th>
            <th>Nivel Académico</th>
            <th>Modalidad</th>
            <th>Nombre</th>
            <th>Versión</th>
            <th>Duración</th>
            <th>Costo (Bs.)</th>
            <th>Fecha Inicio</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(programa, index) in programasFiltrados" :key="programa.id">
            <td>{{ index + 1 }}</td>
            <td>{{ programa.nivelAcademico?.nombre || '-' }}</td>
            <td>{{ programa.modalidadClase?.nombre || '-' }}</td>
            <td>{{ programa.nombre }}</td>
            <td>v{{ programa.version }}</td>
            <td>{{ programa.duracionMeses }} meses</td>
            <td>Bs. {{ Number(programa.costo).toFixed(2) }}</td>
            <td>{{ new Date(programa.fechaInicio).toLocaleDateString('es-BO') }}</td>
            <td>
              <span :class="['badge', getEstadoBadge(programa.estado).class]">
                {{ getEstadoBadge(programa.estado).text }}
              </span>
            </td>
            <td class="actions">
              <button class="btn-icon btn-edit" @click="emitirEdicion(programa)" title="Editar">
                ✏️
              </button>
              <button
                class="btn-icon btn-delete"
                @click="mostrarEliminarConfirm(programa)"
                title="Eliminar"
              >
                🗑️
              </button>
            </td>
          </tr>
          <tr v-if="programasFiltrados.length === 0">
            <td colspan="9" style="text-align: center">No se encontraron resultados</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Dialog de confirmación -->
    <div v-if="mostrarConfirmDialog" class="modal-overlay" @click="mostrarConfirmDialog = false">
      <div class="modal-content" @click.stop>
        <h3>Confirmar Eliminación</h3>
        <p>¿Está seguro de eliminar "{{ programaDelete?.nombre }}"?</p>
        <div class="modal-actions">
          <button class="btn btn-secondary" @click="mostrarConfirmDialog = false">Cancelar</button>
          <button class="btn btn-danger" @click="eliminar">Eliminar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.search-box {
  margin-bottom: 20px;
}

.search-input {
  width: 100%;
  max-width: 400px;
  padding: 10px 15px;
  background-color: var(--vt-c-black-soft);
  border: 1px solid var(--vt-c-divider-dark-1);
  border-radius: 4px;
  font-size: 14px;
  color: var(--color-text);
}

.search-input:focus {
  outline: none;
  border-color: var(--vt-c-green);
}

.table-container {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  background: var(--vt-c-black-soft);
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--vt-c-divider-dark-1);
  min-width: 1000px;
}

thead {
  background-color: var(--vt-c-black-mute);
  color: var(--vt-c-green);
}

th,
td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid var(--vt-c-divider-dark-2);
  color: var(--color-text);
}

tbody tr:hover {
  background-color: var(--vt-c-black-mute);
}

.actions {
  display: flex;
  gap: 8px;
}

.btn-icon {
  border: none;
  background: none;
  cursor: pointer;
  font-size: 18px;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.btn-icon:hover {
  background-color: var(--vt-c-black-mute);
}

.badge {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  display: inline-block;
}

.badge-planificacion {
  background-color: #856404;
  color: #fff3cd;
}

.badge-curso {
  background-color: #0c5460;
  color: #d1ecf1;
}

.badge-finalizado {
  background-color: #155724;
  color: #d4edda;
}

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
}

.modal-content {
  background: var(--vt-c-black-soft);
  padding: 30px;
  border-radius: 8px;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  border: 1px solid var(--vt-c-divider-dark-1);
}

.modal-content h3 {
  margin-top: 0;
  color: var(--color-heading);
}

.modal-content p {
  color: var(--color-text);
}

.modal-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 20px;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
}

.btn-secondary {
  background-color: var(--vt-c-black-mute);
  color: var(--color-text);
  border: 1px solid var(--vt-c-divider-dark-1);
}

.btn-secondary:hover {
  background-color: var(--vt-c-black);
}

.btn-danger {
  background-color: #e74c3c;
  color: white;
}

.btn-danger:hover {
  background-color: #c0392b;
}
</style>
