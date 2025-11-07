<template>
  <div class="modalidad-clase">
    <div class="header">
      <h1>Modalidades de Clase</h1>
      <button v-if="!mostrarFormulario" class="btn-new" @click="mostrarFormulario = true">
        Nueva Modalidad
      </button>
    </div>

    <Transition name="slide-fade">
      <ModalidadClaseForm
        v-if="mostrarFormulario"
        :modalidad="modalidadSeleccionada"
        @save="guardarModalidad"
        @cancel="cancelarEdicion"
      />
    </Transition>

    <ModalidadClaseList
      v-show="!mostrarFormulario"
      ref="listaRef"
      @edit="editarModalidad"
    />
  </div>
</template>

<script setup lang="ts">
import ModalidadClaseForm from '@/components/modalidad-clase/ModalidadClaseForm.vue'
import ModalidadClaseList from '@/components/modalidad-clase/ModalidadClaseList.vue'
import type { ModalidadClase } from '@/models/modalidad-clase'
import { ref } from 'vue'

const mostrarFormulario = ref(false)
const modalidadSeleccionada = ref<ModalidadClase | undefined>()
const listaRef = ref<InstanceType<typeof ModalidadClaseList> | null>(null)

function editarModalidad(modalidad: ModalidadClase) {
  modalidadSeleccionada.value = modalidad
  mostrarFormulario.value = true
}

function guardarModalidad() {
  mostrarFormulario.value = false
  modalidadSeleccionada.value = undefined
  listaRef.value?.obtenerLista()
}

function cancelarEdicion() {
  mostrarFormulario.value = false
  modalidadSeleccionada.value = undefined
}
</script>

<style scoped>
.modalidad-clase {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

h1 {
  margin: 0;
  font-size: 32px;
  color: var(--color-heading);
}

.btn-new {
  padding: 10px 20px;
  background-color: var(--vt-c-green);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: background-color 0.3s;
}

.btn-new:hover {
  background-color: var(--vt-c-green-dark);
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>