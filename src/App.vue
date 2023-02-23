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
template{
}

.all{
  background: url("./components/image/biblio.jpeg")  ;
  background-size: 100%;
  max-width: 1424px;
  /*background-position: center;*/
  background-repeat: repeat-y;

}
/*
* On utilise les media query pour s'assurer du responsive design
*/
@media screen and (max-width: 1144px){
  .all{
  }
}
</style>
