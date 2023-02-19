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
    <input type="submit" value="valider" />
  </form>
</template>

<style scoped>
form
{
  border: solid red;
}
</style>
