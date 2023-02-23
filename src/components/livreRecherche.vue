

<script setup>
const emit = defineEmits(["recherche"]);

</script>
<template>
  <form @submit.prevent="$emit('recherche', motcle)">
    <input type="text" v-model="motcle" placeholder="Rechercher un livre" />
    <input type="submit" value="Rechercher" />
  </form>

</template>
<style scoped>
legend{
  color: white;
}
form{
  /*border : solid yellow;*/
  /*height: 200px;*/
  background-color: antiquewhite;
  height: 100px;
  width: 250px;
  border-radius: 15px;
  position: absolute;
  top: 50px;
  right: 10%;

  display: flex;
}

input{
  font-family: Dosis;
  padding: 10px;
  border: 2px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 16px;
  background-color: #fff;
  color: #444;
  transition: border-color 0.3s ease-in-out;
 height: 50px;
  width: 200px;
  position: absolute;
  top: 20px;
  right: 30px
}

input:focus {
  outline: none;
  border-color: #ad2323;
  box-shadow: 0px 0px 5px #ad2323;
}
/*
input[type="submit"]:hover{
  background-color: #ad2323;
  color: white;

}*/
input[type="submit"]{
display: none;

}


/*
* On utilise les media query pour s'assurer du responsive design
*/
@media screen and (max-width: 1144px){
  form{
    position: absolute;
    top: 160px;
    left: 210px;

  }
}


</style>