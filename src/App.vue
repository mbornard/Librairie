<script setup>
import LivreListe from "./components/livreListe.vue";
import LivreHeader from "./components/livreHeader.vue";
import LivreRecherche from "./components/livreRecherche.vue"
</script>

<template >

    <livreHeader />

    <livreListe class ="all"/>


</template>

<style scoped>
.all{
  border: solid green;

}

.all
{
  background: url("./components/image/biblio.jpeg");
  background-size: contain;
  /*background-position: center;*/
  background-repeat: repeat-y;
  background-position-y: 160px;

}
</style>
