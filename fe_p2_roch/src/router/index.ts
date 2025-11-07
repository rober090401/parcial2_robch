import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/niveles-academicos',
      name: 'niveles-academicos',
      component: () => import('../views/NivelesAcademicosView.vue'),
    },
    {
      path: '/programas',
      name: 'programas',
      component: () => import('../views/ProgramasView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/modalidad-clases',
      name: 'modalidad-clases',
      component: () => import('../views/ModalidadClaseView.vue'),
    },
  ],
})

export default router
