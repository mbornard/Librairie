

<script setup>
const emit = defineEmits(["recherche"]);

</script>
<template>
  <form @submit.prevent="$emit('recherche', motcle)">
    <legend>Rechercher un livre</legend>
    <input type="text" v-model="motcle" placeholder="Recherche" />
    <input type="submit" value="Rechercher" />
  </form>

</template>
<style scoped>
form{
  border : solid yellow;

}
</style>