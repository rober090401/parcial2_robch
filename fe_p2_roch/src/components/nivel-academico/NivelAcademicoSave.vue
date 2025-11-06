<script setup lang="ts">
import type { NivelAcademico } from '@/models/nivel-academico'
import axios from 'axios'
import { computed, ref, watch } from 'vue'

const API_URL = 'http://localhost:3000/api/v1/niveles-academicos'

const props = defineProps({
  mostrar: Boolean,
  nivelAcademico: {
    type: Object as () => NivelAcademico,
    default: () => ({}) as NivelAcademico
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

const nivel = ref<NivelAcademico>({ ...props.nivelAcademico } as NivelAcademico)

watch(
  () => props.nivelAcademico,
  (newVal) => {
    nivel.value = { ...newVal } as NivelAcademico
  }
)

async function handleSave() {
  try {
    const body = {
      nombre: nivel.value.nombre,
      descripcion: nivel.value.descripcion
    }

    if (props.modoEdicion) {
      await axios.patch(`${API_URL}/${nivel.value.id}`, body)
    } else {
      await axios.post(API_URL, body)
    }

    emit('guardar')
    nivel.value = {} as NivelAcademico
    dialogVisible.value = false
  } catch (error: any) {
    alert(error?.response?.data?.message || 'Error al guardar')
  }
}

watch(
  () => props.mostrar,
  (nuevoValor) => {
    if (nuevoValor) {
      if (props.nivelAcademico?.id) {
        nivel.value = { ...props.nivelAcademico }
      } else {
        nivel.value = {} as NivelAcademico
      }
    }
  }
)
</script>

<template>
  <div v-if="dialogVisible" class="modal-overlay" @click="dialogVisible = false">
    <div class="modal-content" @click.stop>
      <h3>{{ props.modoEdicion ? 'Editar' : 'Crear' }} Nivel Académico</h3>

      <form @submit.prevent="handleSave">
        <div class="form-group">
          <label for="nombre">Nombre*</label>
          <input
            id="nombre"
            v-model="nivel.nombre"
            type="text"
            required
            maxlength="20"
            placeholder="Diplomado, Especialidad, Maestría, Doctorado"
            autofocus
          />
        </div>

        <div class="form-group">
          <label for="descripcion">Descripción</label>
          <textarea
            id="descripcion"
            v-model="nivel.descripcion"
            rows="3"
            maxlength="500"
            placeholder="Descripción opcional"
          ></textarea>
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
}

.modal-content {
  background: white;
  padding: 30px;
  border-radius: 8px;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.modal-content h3 {
  margin-top: 0;
  margin-bottom: 20px;
  color: #2c3e50;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #2c3e50;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  font-family: inherit;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #3498db;
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
</style>
