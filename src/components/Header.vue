<template>
  <header class="header">
    <h1>
      <router-link :to="{ path: '/' }" title="Ir para Página Inicial"
        >LISTA DE PRODUTOS</router-link
      >
    </h1>
  </header>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 15px 20px;
  margin-bottom: 100px;
  box-shadow: 0 2px 4px rgb(30, 60, 90, 0.1);
}

.header h1 {
  font-size: 36px;
  color: #e80;
  font-weight: 700;
  letter-spacing: -3px;
}

/* =========== RESPONSIVE =========== */
@media only screen and (max-width: 768px) {
  .header {
    padding: 15px 0;
    justify-content: center;
  }
}
</style>