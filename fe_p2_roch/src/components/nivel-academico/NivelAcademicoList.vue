<script setup lang="ts">
import type { NivelAcademico } from '@/models/nivel-academico'
import axios from 'axios'
import { computed, onMounted, ref } from 'vue'

const API_URL = 'http://localhost:3000/api/v1/niveles-academicos'

const nivelesAcademicos = ref<NivelAcademico[]>([])
const nivelDelete = ref<NivelAcademico | null>(null)
const mostrarConfirmDialog = ref<boolean>(false)
const emit = defineEmits(['edit'])

async function obtenerLista() {
  try {
    const response = await axios.get(API_URL)
    nivelesAcademicos.value = response.data
  } catch (error) {
    console.error('Error al obtener niveles académicos:', error)
  }
}

function emitirEdicion(nivel: NivelAcademico) {
  emit('edit', nivel)
}

function mostrarEliminarConfirm(nivel: NivelAcademico) {
  nivelDelete.value = nivel
  mostrarConfirmDialog.value = true
}

async function eliminar() {
  if (nivelDelete.value) {
    try {
      await axios.delete(`${API_URL}/${nivelDelete.value.id}`)
      obtenerLista()
    } catch (error) {
      console.error('Error al eliminar:', error)
    }
  }
  mostrarConfirmDialog.value = false
}

onMounted(() => {
  obtenerLista()
})

defineExpose({ obtenerLista })
</script>

<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>Nro.</th>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(nivel, index) in nivelesAcademicos" :key="nivel.id">
          <td>{{ index + 1 }}</td>
          <td>{{ nivel.nombre }}</td>
          <td>{{ nivel.descripcion || '-' }}</td>
          <td class="actions">
            <button class="btn-icon" @click="emitirEdicion(nivel)" title="Editar">✏️</button>
            <button class="btn-icon" @click="mostrarEliminarConfirm(nivel)" title="Eliminar">
              🗑️
            </button>
          </td>
        </tr>
        <tr v-if="nivelesAcademicos.length === 0">
          <td colspan="4" style="text-align: center">No hay registros</td>
        </tr>
      </tbody>
    </table>

    <!-- Dialog de confirmación -->
    <div v-if="mostrarConfirmDialog" class="modal-overlay" @click="mostrarConfirmDialog = false">
      <div class="modal-content" @click.stop>
        <h3>Confirmar Eliminación</h3>
        <p>¿Está seguro de eliminar "{{ nivelDelete?.nombre }}"?</p>
        <div class="modal-actions">
          <button class="btn btn-secondary" @click="mostrarConfirmDialog = false">Cancelar</button>
          <button class="btn btn-danger" @click="eliminar">Eliminar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  background: var(--vt-c-white);
  border: 1px solid var(--vt-c-divider-light-1);
}

thead {
  background-color: var(--vt-c-white-mute);
}

th {
  color: var(--vt-c-text-light-1);
  font-weight: 600;
  font-size: 0.9rem;
  padding: 10px;
  border-bottom: 1px solid var(--vt-c-divider-light-1);
  text-align: left;
}

td {
  padding: 10px;
  border-bottom: 1px solid var(--vt-c-divider-light-2);
  color: var(--vt-c-text-light-2);
  font-size: 0.9rem;
}

.actions {
  display: flex;
  gap: 8px;
}

.btn-icon {
  border: none;
  background: none;
  cursor: pointer;
  font-size: 16px;
  padding: 4px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: var(--vt-c-white);
  padding: 20px;
  width: 90%;
  max-width: 400px;
  border: 1px solid var(--vt-c-divider-light-1);
}

.modal-content h3 {
  margin-top: 0;
  color: var(--vt-c-text-light-1);
  font-size: 1.1rem;
  font-weight: 600;
}

.modal-content p {
  color: var(--vt-c-text-light-2);
  font-size: 0.95rem;
  margin: 16px 0;
}

.modal-actions {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  margin-top: 20px;
}

.btn {
  padding: 6px 12px;
  border: 1px solid var(--vt-c-divider-light-1);
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  background-color: var(--vt-c-white);
}

.btn-secondary {
  color: var(--color-text);
}

.btn-danger {
  background-color: #ffebee;
  color: #d32f2f;
  border-color: #ffcdd2;
}
</style>
