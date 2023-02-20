<script setup>
defineProps(["livre"]);
const emit = defineEmits(["stockMoinsC", "stockPLusC", "deleteC"]);
</script>
<template>
  <div class = book>
    <table>
      <tr>
        <td class="titre">{{livre.titre}}</td>
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
  transition: all .3s ease-in-out;
  transform-origin: left center 0px;
  transform-style: preserve-3d;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  -webkit-backface-visibility: hidden;
  overflow: hidden;
}
table{
  padding: 70px;
  width: 200px;
}
.book:hover {
  cursor: pointer;
  transform: rotateY(-28deg) rotateZ(-2deg) scale(1.02);
  -webkit-backface-visibility: hidden;
  box-shadow: 1px 3px 2px #000000, 20px 8px 0 #bb2020;
}
/*ad2323  e33434 */

.book:hover::after {
  content: " ";
  display: block;
  opacity: 1;
  width: 172px;
  height: 255px;
  position: relative;
  left: 8px;
  background: linear-gradient(-180deg, rgba(255, 255, 255, .1) 0%, rgba(255, 255, 255, 0) 60%);
}

.book:hover::before {
  transform: translateY(9px);
  opacity: 1;

}
@font-face {
  font-family: "The Book";
  src: url("./Font/The Book.otf");
}
.titre
{
  font-family: The Book;
  font-size: 1.7em;
}
</style>
