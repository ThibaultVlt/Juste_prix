"use strict";
/** @type {Array} */
const nomObjet = ["chaise","costume d'Halloween", "grill", "guitare", "sac à main"];
/** @type {Array} */
const imageObjet = [`chaise.png`, `costume-haloween.png`, `grill.png`, `guitare.png`, `sac-a-main.png`];
/** @type {Media} */
const sonGagne = new Audio('CRWDCheer_Applaudissements concert bar 8 (ID 2486)_LS.mp3');
/** @type {Media} */
const sonPerdu = new Audio('VOXCry_Enfant de 5 ans qui pleure 5 (ID 2552)_LS.mp3')
;
/** @type {Int} */
let prixSaisi;
/** @type {Int} */
let prixGenere;
/** @type {Int} */
let compteurTentative; //max 10


let message = document.querySelector('#message');
let bouton = document.querySelector('#bouton');
let nbTentative = document.querySelector('#nb-tentative');
let image = document.querySelector('#image');
let nomImage = document.querySelector('#nom-image');
let recommencer = document.querySelector('#btn-reset');

/**
 *Fonction permettant de générer le prix aléatoirement.
 *
 * @param {Int} max
 * @returns {Int}
 */
function genererPrix(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

/**
 *Fonction permettant de récupérer l'image et le nom de l'objet.
 *
 */
function genererObjet() {
    let objetIndex = Math.floor(Math.random() * nomObjet.length);
    image.src = imageObjet[objetIndex];
    nomImage.innerText = nomObjet[objetIndex];
}

/**
 *Fonction de mise a 0 du jeu
 *Initialisation des variables.
 */
function initialiserJeu() {
    genererObjet();
    prixGenere = genererPrix(100);
    compteurTentative = 10;
    nbTentative.innerText = `Nombre des tentatives restantes : ${compteurTentative}`;
    message.innerHTML = '';
    console.log("Prix généré : " + prixGenere); //Prix générer pour information dans la console du navigateur
    bouton.disabled = false;
    recommencer.disabled = true;
    sonGagne.pause();
    sonPerdu.pause();
}



/**
 *Fonction permettant au joueur de trouver le prix de l'objet.
 *
 * @returns {String}
 */
function trouverPrix() {
    if (compteurTentative > 0) {
        prixSaisi = parseInt(document.querySelector('#prix').value);
        //Vérification que la valeur donnée est un nombre
        if (isNaN(prixSaisi)) {
            message.innerHTML = '<p class="text-bg-warning fw-lighter">Veuillez entrer un nombre.</p>';
            return;
        }
        //Compteur de tentative
        compteurTentative--;
        // Afficher le nombre de tentatives restantes
        nbTentative.innerText = `Nombre des tentatives restantes : ${compteurTentative}`;
        //Comparaison de la proposition du joueur avec le prix généré
        if (prixSaisi === prixGenere) {
            message.innerHTML = '<p class="text-success text-uppercase clignotant">Bravo ! Vous avez trouvé le bon prix.</p>';
            sonGagne.play();
            bouton.disabled = true;
            recommencer.disabled = false;
        } else if (compteurTentative === 0) {
            message.innerHTML = `<p class="text-danger fw-bold text-uppercase">Vous avez perdu ! Le prix était ${prixGenere}€.</p>`;
            sonPerdu.play();
            bouton.disabled = true;
            recommencer.disabled = false;
        } else if (prixSaisi < prixGenere) {
            recommencer.disabled = false;
            message.innerHTML = '<p class="text-info text-uppercase">C\'est plus ! Essayez encore.</p>';
        } else {
            recommencer.disabled = false;
            message.innerHTML = '<p class="text-info text-uppercase">C\'est moins ! Essayez encore.</p>';
        }
    }
}
