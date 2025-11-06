<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="home-container">
    <div class="welcome-section">
      <p class="subtitle">Universidad San Francisco Xavier de Chuquisaca</p>

      <div>
        <div>
          <h2>Niveles Académicos</h2>
          <RouterLink to="/niveles-academicos" class="btn">Gestionar Niveles</RouterLink>
        </div>

        <div>
          <h2>Programas</h2>
          <RouterLink to="/programas" class="btn">Gestionar Programas</RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/*.home-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}*/

.welcome-section {
  text-align: center;
}

h1 {
  color: var(--color-heading);
  font-size: 2.5rem;
  margin-bottom: 10px;
}

.subtitle {
  color: var(--vt-c-black);
  font-size: 1.3rem;
  margin-bottom: 40px;
}

/*.cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
}*/

.card {
  padding: 20px;
}

.card h2 {
  color: var(--vt-c-text-light-1);
  margin-bottom: 15px;
}

.card p {
  color: var(--vt-c-text-light-2);
  line-height: 1.6;
  margin-bottom: 20px;
}

.btn {
  background-color: #7cfc00;
  color: #151c0e;
  padding: 8px 16px;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 600;
}

.info-section {
  background: var(--vt-c-black-soft);
  padding: 30px;
  border-radius: 8px;
  border: 1px solid var(--vt-c-divider-dark-1);
  text-align: left;
  max-width: 600px;
  margin: 0 auto;
}

.info-section h3 {
  color: var(--vt-c-green);
  margin-bottom: 20px;
  text-align: center;
}

.info-section ul {
  list-style: none;
  padding: 0;
}

.info-section li {
  color: var(--color-text);
  padding: 10px 0;
  border-bottom: 1px solid var(--vt-c-divider-dark-2);
}

.info-section li:last-child {
  border-bottom: none;
}

@media (max-width: 750px) {
  h1 {
    font-size: 1.8rem;
  }

  .subtitle {
    font-size: 1.1rem;
  }

  .cards-container {
    grid-template-columns: 1fr;
  }
}
</style>
