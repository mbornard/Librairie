<script setup>
import { ref } from "vue";
// -- donnée réactive pour la saisie du libellé
const libelle = ref("");

const emit = defineEmits(["newBook"]);
</script>

<template>
  <form @submit.prevent="$emit('newBook', titre, prix, stock)">
    <legend>Ajout d'un nouveau livre</legend>
    <input type="text" v-model="titre" placeholder="Titre du livre" />
    <input type="number" v-model="prix" placeholder="Prix €" min="0">
    <input type="number" v-model="stock" placeholder="Qtté en stock" min="1">
    <input type="submit" value="valider" class="button"/>
  </form>
</template>

<style scoped>
form
{
  border: solid red;
}
input{
  padding: 10px;
  border: 2px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 16px;
  background-color: #fff;
  color: #444;
  transition: border-color 0.3s ease-in-out;
}

input:focus {
  outline: none;
  border-color: #ad2323;
  box-shadow: 0px 0px 5px #ad2323;
}
.button:hover{
  background-color: #ad2323;
  color: white;
}

</style>
