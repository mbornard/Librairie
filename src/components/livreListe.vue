

<script setup>


import { reactive, onMounted } from "vue";
import LivreItem from "./livreItem.vue";
import bookForm from "./bookForm.vue";
import Livre from "../Livre";
import LivreRecherche from "./livreRecherche.vue";


const listeLivre = reactive([]);

const url = "https://webmmi.iut-tlse3.fr/~pecatte/librairies/public/11/livres";

/*
* Méthode permettant de récupérer tous les livres de la BD grâce à une requette ajax
* */
function getBooks() {
  const fetchOptions = { method: "GET" };
  fetch(url, fetchOptions)
      .then((response) => {
        console.log(response)
        return response.json();
      })
      .then((dataJSON) => {
        console.log(dataJSON);
        listeLivre.splice(0, listeLivre.length);
        dataJSON.forEach((l) => listeLivre.push(new Livre(l.id,l.titre,  l.qtestock, l.prix)));
      })
      .catch((error) => console.log(error));
}


/*
* Méthode permettant d'ajouter un livre à la bibliothèque
* */
function handlerAdd( titre, prix, stock) { //titre, prix, qtestock
  console.log(titre, prix, stock);
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  // --  le libelle de la nouvelle chose est envoyé au serveur
  //  via le body de la req AJAX
  const fetchOptions = {
    method: "POST",
    headers: myHeaders, //titre: titre, prix : prix, qtestock : qtestock
    body: JSON.stringify( {titre: titre, prix : prix, qtestock : stock} ),
  };
  fetch(url, fetchOptions)
      .then((response) => {
        return response.json();
      })
      .then((dataJSON) => {
        console.log(dataJSON);
        getBooks();
        closeForm()
      })
      .catch((error) => console.log(error));
}


/*
* Méthode permettant de décrémenter le stock
* */
function handlerMoins(livre) {
  console.log(livre);
  livre.stockMoins();
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const fetchOptions = {
    method: "PUT",
    headers: myHeaders, //{ id :livre.id, titre: livre.titre, prix : livre.prix, qtestock : livre.qtestock}
    body: JSON.stringify({"id":livre.id, "titre": livre.titre, "prix" : livre.prix, "qtestock" :livre.qtestock}),
  };
  fetch(url, fetchOptions)
      .then((response) => {
        return response.json();
      })
      .then((dataJSON) => {
        console.log(dataJSON);
        if(livre.qtestock == 0) handlerDelete(livre.id);
        getBooks();

      })
      .catch((error) => console.log(error));
}
/*
* Méthode permettant de d'incrémenter le stock
* */
function handlerPlus(livre) {
  console.log(livre);
  //alert(livre.id);
  livre.stockPlus();
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const fetchOptions = {
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify({"id":livre.id, "titre": livre.titre, "prix" : livre.prix, "qtestock" :livre.qtestock}),
  };
  fetch(url, fetchOptions)
      .then((response) => {
        return response.json();
      })
      .then((dataJSON) => {
        console.log(dataJSON);
        // actualiser la liste des livres
        getBooks();

      })
      .catch((error) => console.log(error));
}
/*
* Permet de supprimer un livre
* */
function handlerDelete(id) {
  //alert(id);
  const fetchOptions = {
    method: "DELETE",
  };
  // -- l'id de la chose à supprimer doit être
  //  ajouté à la fin de l'url
  fetch(url + "/" + id, fetchOptions)
      .then((response) => {
        return response.json();
      })
      .then((dataJSON) => {
        console.log(dataJSON);
        getBooks();
        getResults()

      })
      .catch((error) => console.log(error));
}

const listeLivreRes = reactive([]);

/*
* Méthode qui permet de récupérer les résultats de la recherche d'un livre
* */
function getResults(motcle) {
  //const urlRecherche ="https://webmmi.iut-tlse3.fr/~pecatte/librairies/public/11/livres?motcle="+motcle
//alert(urlRecherche)
  const fetchOptions = { method: "GET" };

  fetch(url+"?search="+motcle, fetchOptions)
      .then((response) => {
        console.log(response)
        return response.json();
      })
      .then((dataJSON) => {
        console.log(dataJSON);
        listeLivreRes.splice(0, listeLivreRes.length);
        dataJSON.forEach((l) => listeLivreRes.push(new Livre(l.id,l.titre,  l.qtestock, l.prix)));
        //alert(listeLivreRes)
      })
      .catch((error) => console.log(error));
}

/*
* Ces méthodes permettenr d'ouvrir et de fermer la fenêtre pop-up qui permet
* d'afficher le formulaire permettant d'ajouter un livre
* */
function openForm() {
  document.getElementById("formAddBook").style.display = "block";
}

function closeForm() {
  document.getElementById("formAddBook").style.display = "none";
}
/* Permet de fermer le pop-up lorsqu'on appuie sur la touche echap*/
document.addEventListener('keydown', function(event) {
  if (event.key === "Escape") {
    closeForm();
  }
});
onMounted(() => {
  getBooks();
  getResults()
});
</script>


<template>
  <div class = all>
    <LivreRecherche @recherche="getResults" />
    <div class="list">
    <livreItem
        v-for="livre of listeLivreRes"
        :key="livre.id"
        :livre="livre"
        @stockMoinsC="handlerMoins"
        @stockPLusC="handlerPlus"
        @deleteC="handlerDelete"
    />
    </div>
    <button @click="openForm()" id="ajouterLivre">Ajouter un livre</button>
    <bookForm @newBook="handlerAdd" id="formAddBook"></bookForm>
    <div class = list id="listTot">
      <livreItem
          v-for="livre of listeLivre"
          :key="livre.id"
          :livre="livre"
          @stockMoinsC="handlerMoins"
          @stockPLusC="handlerPlus"
          @deleteC="handlerDelete"
      />
    </div>
  </div>
</template>
<style scoped>

.all{
  display: flex;
  flex-direction: column;
  /*padding : 10px;*/
  width: 100%;

}
.list
{
  /*border : solid yellow;*/
  margin-top: -20px; /*5%*/

  margin-right: 10px; /*0.5%*/
  margin-left: 3%;
  margin-bottom: 5%;


  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;

  max-width: 1424px;
}

/*
CSS pour le bouton permettant l'apparition du popUP poue ajouter un livre
*/
#formAddBook{
  display: none;
  position: fixed;
  margin-left: 150px;
  top: 25%;
  width:820px;
  border: 3px solid #f1f1f1;
  z-index: 9;

}
@font-face {
  font-family: "Dosis";
  src: url("./Font/Dosis-VariableFont_wght.ttf");
}
#ajouterLivre{
  font-family: Dosis;
  width: 200px;
  height: 100px;
  position: absolute;
  top:50px;
  left: 10%;
  background-color: antiquewhite;
  font-size: 27px;
  border-radius: 15px;
}
#ajouterLivre:hover{
  box-shadow: 5px 5px 2px #444444;
}
#ajouterLivre:active{
  background-color: #ad2323;
  color: black;
}

/*
* On utilise les media query pour s'assurer du responsive design
*/
@media screen and (max-width: 1220px){
.list{
  grid-template-columns: 1fr 1fr 1fr 1fr;
}
}
@media screen and (max-width: 1144px){

  #ajouterLivre{
    position: absolute;
    top: 160px;
    left : 0px
  }

  .list{

    grid-template-columns: 1fr 1fr 1fr;
  }

}
@media screen and (max-width: 752px){
  .list{

    grid-template-columns: 1fr 1fr ;
  }
}


</style>