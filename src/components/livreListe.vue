

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
* Méthode permettant de décrémenter le stock
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
    <bookForm @newBook="handlerAdd"></bookForm>
    <div class = list>
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
  padding : 10px;
}
.list
{
  border : solid red;
  display: flex;
  flex-direction: row;
  margin: 10px
}
</style>