<script setup lang="ts">
import type { NivelAcademico } from '@/models/nivel-academico'
import NivelAcademicoList from '@/components/nivel-academico/NivelAcademicoList.vue'
import NivelAcademicoSave from '@/components/nivel-academico/NivelAcademicoSave.vue'
import { ref } from 'vue'

const listRef = ref<InstanceType<typeof NivelAcademicoList>>()
const showSaveModal = ref(false)
const nivelActual = ref<NivelAcademico>({} as NivelAcademico)
const modoEdicion = ref(false)

function handleCreate() {
  nivelActual.value = {} as NivelAcademico
  modoEdicion.value = false
  showSaveModal.value = true
}

function handleEdit(nivel: NivelAcademico) {
  nivelActual.value = nivel
  modoEdicion.value = true
  showSaveModal.value = true
}

function handleGuardar() {
  showSaveModal.value = false
  listRef.value?.obtenerLista()
}

function handleClose() {
  showSaveModal.value = false
}
</script>

<template>
  <div class="niveles-academicos">
    <div class="header-section">
      <h1>Niveles Académicos</h1>
      <button class="btn btn-primary" @click="handleCreate">➕ Nuevo Nivel</button>
    </div>

    <NivelAcademicoList ref="listRef" @edit="handleEdit" />

    <NivelAcademicoSave
      :mostrar="showSaveModal"
      :nivel-academico="nivelActual"
      :modo-edicion="modoEdicion"
      @guardar="handleGuardar"
      @close="handleClose"
    />
  </div>
</template>

<style scoped>
.niveles-academicos {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
}

.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

h1 {
  color: var(--vt-c-green);
  margin: 0;
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
  background-color: #7cfc00;
  color: #000000;
}
</style>
