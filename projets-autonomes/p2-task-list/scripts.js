const bouttonAjouter = document.querySelector("#ajouter");
const libelleTache = document.querySelector("#libelle");
const listeTaches = document.querySelector("#liste-taches");
const listeTachescompletees = document.querySelector("#liste-taches-completees");
const message  = document.querySelector('#message');

// On récupère les tâches déjà enregistrées
let monTableauDeTaches = JSON.parse(localStorage.getItem("tasks")) || [];
let monTableauDeTachesCompletees = JSON.parse(localStorage.getItem("tasksCompletees")) || []; 
// Afficher les tâches au chargement
afficherTaches();
afficherTachesCompletees();
// Affichage des tâches
function afficherTaches() {

  // On vide d'abord le tableau HTML
  listeTaches.innerHTML = "";

  monTableauDeTaches.forEach((tache, index) => {

    const ligne = document.createElement("tr");

    ligne.innerHTML = `
      <td><center>${index + 1}</center></td>
      <td><center>${tache}</center></td>
      <td>
        <center>
            <button class="modifier" data-index="${index}">Modifier</button>
            <button class="supprimer" data-index="${index}">Supprimer</button>
            <button class="completee" data-index="${index}">Effectuée</button>
        </center>
      </td>
    `;

    ligne.classList.add = ""
    listeTaches.appendChild(ligne);
  });
}


function afficherTachesCompletees() {

  // On vide d'abord le tableau HTML
  listeTachescompletees.innerHTML = "";

  monTableauDeTachesCompletees.forEach((tache, index) => {

    const ligne = document.createElement("tr");

    ligne.innerHTML = `
      <td><center>${index + 1}</center></td>

      <td><center>${tache}</center></td>

      <td><center>Complétée ✅</center></td>
    `;

    ligne.classList.add("tache-completee");

    listeTachescompletees.appendChild(ligne);
  });
}

// Ajouter une tâche
bouttonAjouter.addEventListener("click", () => {

  let valeurLibelleTache = libelleTache.value.trim();

  if (valeurLibelleTache === "") {
    let retour =  document.createElement("br");
    message.parentNode.insertBefore(retour, message); 
    message.textContent = "Merci de renseigner une tâche"
    message.style.color = "red";
    message.style.textAlign = "center";
    message.style.fontWeight = "bold";
    return;
  }

  monTableauDeTaches.push(valeurLibelleTache);

  // Sauvegarde dans localStorage
  localStorage.setItem("tasks", JSON.stringify(monTableauDeTaches));
  // Réaffichage du tableau
  afficherTaches();
  // Vider le champ
  libelleTache.value = "";
});

 listeTaches.addEventListener("click", (e) => {

  // SUPPRIMER
  if (e.target.classList.contains("supprimer")) {
    const index = e.target.dataset.index;
    monTableauDeTaches.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(monTableauDeTaches));
    afficherTaches();
  }

  // MODIFIER
  if (e.target.classList.contains("modifier")) {
    const index = e.target.dataset.index;
    const nouvelleTache = prompt("Modifier la tâche :", monTableauDeTaches[index]);
    if (nouvelleTache !== null && nouvelleTache.trim() !== "") {
      monTableauDeTaches[index] = nouvelleTache.trim();
      localStorage.setItem("tasks", JSON.stringify(monTableauDeTaches));
      afficherTaches();
    }
  }

  // COMPLÉTER
  if (e.target.classList.contains("completee")) {
    const index = e.target.dataset.index;
    const tacheComplétée = monTableauDeTaches[index];

    monTableauDeTachesCompletees.push(tacheComplétée);
    localStorage.setItem("tasksCompletees", JSON.stringify(monTableauDeTachesCompletees));

    monTableauDeTaches.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(monTableauDeTaches));

    afficherTaches();
    afficherTachesCompletees();
  }

}); // une seule accolade fermante, un seul listener