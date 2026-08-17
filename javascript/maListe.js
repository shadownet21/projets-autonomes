const btnSave = document.querySelector("#save");
const textInput = document.querySelector("#textInput");
let    maListe  = [];

// On crée la liste <ul> et on l'ajoute au <body> au chargement de la page
const nouvelElementUl = document.createElement("ul");
document.body.appendChild(nouvelElementUl);

btnSave.addEventListener("click", function(e) {
    e.preventDefault(); 
    
    let valeur = textInput.value;

    if (valeur === "") {

        alert("Merci d'ajouter une tâche");

    } else {
                const espace = document.createElement("br");
                const nouvelElementLi = document.createElement("li");
               

                nouvelElementLi.textContent = valeur + " ";

                const btnSupprimer = document.createElement("button");
                btnSupprimer.textContent = "Supprimer🗑️";
                btnSupprimer.style.backgroundColor = "#A52A2A";
                 

                btnSupprimer.addEventListener("click", function () {
                    nouvelElementLi.remove();
                });

                nouvelElementLi.appendChild(btnSupprimer);
               
                nouvelElementUl.appendChild(nouvelElementLi);
                nouvelElementUl.appendChild(espace);



                textInput.value = "";

                //Enregistrer dans le localStorage
                maListe.push(valeur);

                localStorage.setItem("maListe", JSON.stringify(maListe));


                

    }
});


