// Déclaration des variables

let btnPlus = document.querySelector("#increment");
let btnMoins = document.querySelector("#decrement");
let btnReset = document.querySelector("#reinitialiser");
 

let valeur = document.querySelector("#valeur_compteur");

btnPlus.addEventListener("click", function() {

    valeur.textContent = parseInt(valeur.textContent) + 1;
    console.log(valeur.textContent);
});



btnMoins.addEventListener("click", function() {

    valeur.textContent = parseInt(valeur.textContent) - 1;
    console.log(valeur.textContent);

    if (parseInt(valeur.textContent) < 0) {
        valeur.textContent = 0;
    }   

});


btnReset.addEventListener("click", function() {

      document.querySelector("#valeur_compteur").textContent = 0;

});

/* ****************************************  FONCTIONNALITE 2 CHANGEMENT DE COULEURS */
let btnCouleurJaune = document.querySelector("#jaune");
let btnCouleurVert = document.querySelector("#vert");
let btnCouleurBleu = document.querySelector("#bleu");   
let carre = document.querySelector("#carre");

btnCouleurJaune.addEventListener("click", function() {
    carre.style.backgroundColor = "yellow";
   
});

btnCouleurVert.addEventListener("click", function() {
    carre.style.backgroundColor = "green";
 
}); 

btnCouleurBleu.addEventListener("click", function() {
    carre.style.backgroundColor = "blue";
 
});

/* **********************************************FONCTIONNALITE 3 VALIDATION DE FORMULAIRE */

let btnValider = document.querySelector("#valider");
let texteFormulaire = document.querySelector("#zoneDeTexte");
let message = document.querySelector("#message");
let btnResetForm = document.querySelector("#reset_formulaire");


btnValider.addEventListener("click", function() {

      if (texteFormulaire.value.trim() === "") {

        message.style.color = "red"; 
        message.textContent = "Veuillez remplir le champ de texte.";

      } else {

        message.style.color = "green";
        message.textContent = "Formulaire soumis avec succès !";

      }
});

btnResetForm.addEventListener("click", function() {

        
       texteFormulaire.value = "";
       message.textContent = "";

      
});


