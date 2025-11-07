<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div id="app">
    <header>
      <div class="header-content container">
        <div class="header-brand">
          <h1>Sistema de Gestión de Programas de Postgrado</h1>
        </div>
        <nav>
          <RouterLink to="/">Inicio</RouterLink>
          <RouterLink to="/niveles-academicos">Niveles Académicos</RouterLink>
          <RouterLink to="/programas">Programas</RouterLink>
          <RouterLink to="/modalidad-clases">Modalidades de Clases</RouterLink>
        </nav>
      </div>
    </header>

    <main>
      <div class="container">
        <RouterView />
      </div>
    </main>

  </div>
</template>

<style scoped>

#app { min-height: 100vh; display: flex; flex-direction: column; }

h1 { margin: 0; font-size: 1.25rem; color: var(--color-heading); }

nav { display: flex; gap: 12px; align-items: center; }

footer p { margin: 0; color: var(--color-text); font-size: 0.95rem; }

@media (max-width: 768px) {
  .header-content { flex-direction: column; align-items: flex-start; gap: 8px; }
}
</style>
