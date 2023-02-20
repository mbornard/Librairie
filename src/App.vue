<script setup>
import LivreListe from "./components/livreListe.vue";
import LivreHeader from "./components/livreHeader.vue";
import LivreRecherche from "./components/livreRecherche.vue"
</script>

<template>
  <div class = all>
    <livreHeader />

    <livreListe />
  </div>

</template>

<style scoped>
.all{
  border: solid green;

}
</style>
