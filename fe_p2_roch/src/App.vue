<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div id="app">
    <header>
      <div class="header-content container">
        <nav class="navigation">
          <RouterLink to="/">Inicio</RouterLink>
          <RouterLink to="/niveles-academicos">Niveles Académicos</RouterLink>
          <RouterLink to="/programas">Programas</RouterLink>
        </nav>
        <div class="header-brand">
          <h1>Sistema de Gestión de Programas de Postgrado</h1>
        </div>
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
/* Scoped adjustments kept minimal: layout spacing and responsive tweaks */
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
}

.navigation {
  width: 100%;
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 15px;
}

h1 {
  margin: 0;
  font-size: 1.25rem;
  color: var(--color-heading);
  text-align: center;
}

footer p {
  margin: 0;
  color: var(--color-text);
  font-size: 0.95rem;
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}
</style>
