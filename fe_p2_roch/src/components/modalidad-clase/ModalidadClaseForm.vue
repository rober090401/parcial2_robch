<template>
  <div class="form-container">
    <form @submit.prevent="guardar" class="form">
      <h2>{{ modoEdicion ? 'Editar' : 'Nueva' }} Modalidad de Clase</h2>

      <div class="form-group">
        <label for="nombre">Nombre:</label>
        <input
          v-model="formData.nombre"
          type="text"
          id="nombre"
          required
          class="form-input"
          placeholder="Ingrese el nombre"
        />
      </div>

      <div class="form-actions">
        <button type="submit" class="btn btn-primary">
          {{ modoEdicion ? 'Actualizar' : 'Guardar' }}
        </button>
        <button type="button" class="btn btn-secondary" @click="cancelar">Cancelar</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import type { ModalidadClase } from '@/models/modalidad-clase'
import axios from 'axios'
import { computed, reactive, ref, watch } from 'vue'

const API_URL = 'http://localhost:3000/api/vi/modalidad-clases'

const props = defineProps<{
  modalidad?: ModalidadClase
}>()

const emit = defineEmits(['save', 'cancel'])

const formData = reactive({
  nombre: ''
})

const modoEdicion = computed(() => !!props.modalidad)

watch(
  () => props.modalidad,
  (nuevoValor) => {
    if (nuevoValor) {
      formData.nombre = nuevoValor.nombre
    } else {
      formData.nombre = ''
    }
  },
  { immediate: true }
)

async function guardar() {
  try {
    if (modoEdicion.value && props.modalidad) {
      await axios.patch(`${API_URL}/${props.modalidad.id}`, formData)
    } else {
      await axios.post(API_URL, formData)
    }
    emit('save')
  } catch (error) {
    console.error('Error al guardar:', error)
  }
}

function cancelar() {
  emit('cancel')
}
</script>

<style scoped>
.form-container {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  background-color: var(--vt-c-black-soft);
  border-radius: 8px;
  border: 1px solid var(--vt-c-divider-dark-1);
}

.form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

h2 {
  margin: 0;
  color: var(--color-heading);
  font-size: 24px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

label {
  color: var(--color-text);
  font-size: 14px;
  font-weight: 600;
}

.form-input {
  padding: 10px 15px;
  background-color: var(--vt-c-black-mute);
  border: 1px solid var(--vt-c-divider-dark-1);
  border-radius: 4px;
  font-size: 14px;
  color: var(--color-text);
  width: 100%;
}

.form-input:focus {
  outline: none;
  border-color: var(--vt-c-green);
}

.form-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
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
  color: white;
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
</style>