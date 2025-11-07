<template>
  <div class="card">
    <Toast />
    <Toolbar class="mb-4">
      <template #start>
        <h2>Listado de Modalidades de Clases</h2>
      </template>
      <template #end>
        <span class="p-input-icon-left mr-2">
          <i class="pi pi-search" />
          <InputText v-model="filters['global'].value" placeholder="Buscar..." />
        </span>
        <Button label="Nuevo" icon="pi pi-plus" severity="success" @click="openNew" />
      </template>
    </Toolbar>

    <DataTable
      ref="dt"
      :value="modalidadClases"
      dataKey="id"
      :paginator="true"
      :rows="10"
      :filters="filters"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      :rowsPerPageOptions="[5, 10, 25]"
      currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} modalidades"
      responsiveLayout="scroll"
    >
      <Column field="id" header="ID" sortable style="min-width: 5rem" />
      <Column field="nombre" header="Nombre" sortable style="min-width: 12rem" />
      <Column field="descripcion" header="Descripción" sortable style="min-width: 16rem" />
      <Column field="tipo" header="Tipo" sortable style="min-width: 10rem" />
      <Column field="nivel" header="Nivel Académico" sortable style="min-width: 12rem" />
      <Column
        field="fecha_creacion"
        header="Fecha Creación"
        sortable
        style="min-width: 12rem"
        :body="formatDate"
      />
      <Column header="Acciones" style="min-width: 10rem">
        <template #body="slotProps">
          <Button
            icon="pi pi-pencil"
            outlined
            rounded
            class="mr-2"
            severity="warning"
            @click="editModalidadClase(slotProps.data)"
          />
          <Button
            icon="pi pi-trash"
            outlined
            rounded
            severity="danger"
            @click="confirmDeleteModalidadClase(slotProps.data)"
          />
        </template>
      </Column>
    </DataTable>

    <Dialog
      v-model:visible="modalidadClaseDialog"
      :style="{ width: '450px' }"
      header="Modalidad de Clase"
      :modal="true"
      class="p-fluid"
    >
      <div class="field">
        <label for="nombre" class="font-bold">Nombre</label>
        <InputText
          id="nombre"
          v-model.trim="modalidadClase.nombre"
          required="true"
          autofocus
          :class="{ 'p-invalid': submitted && !modalidadClase.nombre }"
        />
        <small class="p-error" v-if="submitted && !modalidadClase.nombre">El nombre es requerido.</small>
      </div>
      <div class="field">
        <label for="descripcion" class="font-bold">Descripción</label>
        <Textarea
          id="descripcion"
          v-model.trim="modalidadClase.descripcion"
          required="true"
          rows="3"
          cols="20"
        />
      </div>
      <div class="field">
        <label for="tipo" class="font-bold">Tipo</label>
        <Dropdown
          id="tipo"
          v-model="modalidadClase.tipo"
          :options="tiposModalidad"
          required="true"
          placeholder="Seleccione un tipo"
          :class="{ 'p-invalid': submitted && !modalidadClase.tipo }"
        />
        <small class="p-error" v-if="submitted && !modalidadClase.tipo">El tipo es requerido.</small>
      </div>
      <div class="field">
        <label for="nivel" class="font-bold">Nivel</label>
        <Dropdown
          id="nivel"
          v-model="modalidadClase.nivel"
          :options="nivelesAcademicos"
          required="true"
          placeholder="Seleccione un nivel"
          :class="{ 'p-invalid': submitted && !modalidadClase.nivel }"
        />
        <small class="p-error" v-if="submitted && !modalidadClase.nivel">El nivel es requerido.</small>
      </div>

      <template #footer>
        <Button
          label="Cancelar"
          icon="pi pi-times"
          text
          @click="hideDialog"
        />
        <Button
          label="Guardar"
          icon="pi pi-check"
          @click="saveModalidadClase"
        />
      </template>
    </Dialog>

    <Dialog
      v-model:visible="deleteModalidadClaseDialog"
      :style="{ width: '450px' }"
      header="Confirmar"
      :modal="true"
    >
      <div class="flex align-items-center justify-content-center">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span v-if="modalidadClase"
          >¿Está seguro de eliminar la modalidad de clase <b>{{ modalidadClase.nombre }}</b>?</span
        >
      </div>
      <template #footer>
        <Button
          label="No"
          icon="pi pi-times"
          text
          @click="deleteModalidadClaseDialog = false"
        />
        <Button
          label="Sí"
          icon="pi pi-check"
          text
          @click="deleteModalidadClase"
        />
      </template>
    </Dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import Dropdown from 'primevue/dropdown'
import { useToast } from 'primevue/usetoast'
import type { ModalidadClase } from '@/models/modalidad-clase'
import {
  obtenerModalidadClases,
  crearModalidadClase,
  actualizarModalidadClase,
  eliminarModalidadClase
} from '@/services/modalidad-clases.service'

const toast = useToast()
const dt = ref()
const modalidadClases = ref<ModalidadClase[]>([])
const modalidadClaseDialog = ref(false)
const deleteModalidadClaseDialog = ref(false)
const modalidadClase = ref<ModalidadClase>({} as ModalidadClase)
const submitted = ref(false)
const filters = ref({
  global: { value: null, matchMode: 'contains' },
})

const tiposModalidad = ['PRESENCIAL', 'VIRTUAL', 'MIXTO']
const nivelesAcademicos = ['DOCTORADO', 'DIPLOMADO', 'ESPECIALIDAD', 'MAESTRIA']

onMounted(() => {
  obtenerTodo()
})

const formatDate = (value: string) => {
  return new Date(value).toLocaleString()
}

const openNew = () => {
  modalidadClase.value = {} as ModalidadClase
  submitted.value = false
  modalidadClaseDialog.value = true
}

const hideDialog = () => {
  modalidadClaseDialog.value = false
  submitted.value = false
}

const obtenerTodo = async () => {
  modalidadClases.value = await obtenerModalidadClases()
}

const saveModalidadClase = async () => {
  submitted.value = true

  if (modalidadClase.value.nombre?.trim()) {
    if (modalidadClase.value.id) {
      try {
        await actualizarModalidadClase(modalidadClase.value.id, modalidadClase.value)
        toast.add({
          severity: 'success',
          summary: 'Exitoso',
          detail: 'Modalidad de Clase Actualizada',
          life: 3000
        })
      } catch {
        toast.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Ocurrió un error al actualizar',
          life: 3000
        })
      }
    } else {
      try {
        await crearModalidadClase(modalidadClase.value)
        toast.add({
          severity: 'success',
          summary: 'Exitoso',
          detail: 'Modalidad de Clase Creada',
          life: 3000
        })
      } catch {
        toast.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Ocurrió un error al crear',
          life: 3000
        })
      }
    }

    modalidadClaseDialog.value = false
    modalidadClase.value = {} as ModalidadClase
    obtenerTodo()
  }
}

const editModalidadClase = (mc: ModalidadClase) => {
  modalidadClase.value = { ...mc }
  modalidadClaseDialog.value = true
}

const confirmDeleteModalidadClase = (mc: ModalidadClase) => {
  modalidadClase.value = mc
  deleteModalidadClaseDialog.value = true
}

const deleteModalidadClase = async () => {
  try {
    await eliminarModalidadClase(modalidadClase.value.id)
    deleteModalidadClaseDialog.value = false
    modalidadClase.value = {} as ModalidadClase
    toast.add({
      severity: 'success',
      summary: 'Exitoso',
      detail: 'Modalidad de Clase Eliminada',
      life: 3000
    })
    obtenerTodo()
  } catch {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Ocurrió un error al eliminar',
      life: 3000
    })
  }
}
</script>