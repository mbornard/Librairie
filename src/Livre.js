// une chose
export default class Livre {
    get prix() {
        return this._prix;
    }
    constructor(id, titre, qtestock, prix) {
        this._titre = titre;
        this._qtestock = qtestock;
        this._prix = prix;
        this._id = id; // génération d'un id unique
    }
    get titre() {
        return this._titre;
    }
    get prix(){
        return this._prix;
    }
    get id() {
        return this._id;
    }
    get qtestock() {
        return this._qtestock;
    }

    stockMoins(){
        if(this._qtestock>0){
            this._qtestock -=1;

        }
    }
    stockPlus(){
        this._qtestock +=1;
    }

    afficherLivre() {
        return `${this._titre} : ${this._qtestock} en stock à ${this._prix} €`;
    }
}
