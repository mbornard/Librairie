<template>
  <div class="headerAll">
    <div class="bloc">
      <h3>Matisse & Books</h3>

    </div>
  </div>
</template>

<style scoped>
h3 {
  font-family: Prestige;
  font-size: 63px;
  margin: 18px  10px;


}
.headerAll {
  height: 200px;
  background: url("./image/brique.jpg") repeat-x;
}
.bloc
{
  background-color: antiquewhite;
  height: 120px;
  width: 450px;
  border-radius: 15px;
  position: absolute;
  right: 34%;
  top: 37px
}

@font-face {
  font-family: "Prestige";
  src: url("./Font/Modern Prestige DEMO.otf");
}

/*
* On utilise les media query pour s'assurer du responsive design
*/
@media screen and (max-width: 1144px){
  .headerAll{
    height: 300px;
  }
  .bloc{
    right: 10px;
  }
}
</style>
