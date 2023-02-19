<script setup>
defineProps(["livre"]);
const emit = defineEmits(["stockMoinsC", "stockPLusC", "deleteC"]);
</script>
<template>
  <div class = book>
    <table>
      <tr>
        <td>{{livre.titre}}</td>
      </tr>
      <tr>
        <td> Stock </td>
        <td>{{livre.qtestock}}</td>
      </tr>
      <tr>
        <td> Prix</td>
        <td>{{livre.prix}} €</td>
      </tr>
      <tr>
        <td> <button @click="$emit('stockMoinsC', livre)"> -1</button></td>
        <td> <button @click="$emit('stockPLusC', livre)"> +1</button></td>
      </tr>
      <tr>
       <td> <button @click="$emit('deleteC', livre.id)"> Supprimer livre</button></td>
      </tr>
    </table>
  </div>
</template>

<style>

.book
{
  margin: 10px;
  width: 200px;
  height: 300px;
  background: url("./image/couv.JPG") no-repeat;
  background-size: 200px;
}
table{
  padding: 70px;
  width: 200px;
}
</style>
