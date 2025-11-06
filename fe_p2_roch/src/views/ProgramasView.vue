<script setup lang="ts">
import type { Programa } from '@/models/programa'
import ProgramaList from '@/components/programa/ProgramaList.vue'
import ProgramaSave from '@/components/programa/ProgramaSave.vue'
import { ref } from 'vue'

const listRef = ref<InstanceType<typeof ProgramaList>>()
const showSaveModal = ref(false)
const programaActual = ref<Programa>({} as Programa)
const modoEdicion = ref(false)

function handleCreate() {
  programaActual.value = {} as Programa
  modoEdicion.value = false
  showSaveModal.value = true
}

function handleEdit(programa: Programa) {
  programaActual.value = programa
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
  <div class="programas">
    <div class="header-section">
      <h1>Programas de Postgrado</h1>
      <button class="btn btn-primary" @click="handleCreate">➕ Nuevo Programa</button>
    </div>

    <ProgramaList ref="listRef" @edit="handleEdit" />

    <ProgramaSave
      :mostrar="showSaveModal"
      :programa="programaActual"
      :modo-edicion="modoEdicion"
      @guardar="handleGuardar"
      @close="handleClose"
    />
  </div>
</template>

<style scoped>
.programas {
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

.btn-primary:hover {
  background-color: var(--vt-c-green-dark);
}
</style>
