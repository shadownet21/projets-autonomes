// URL du fichier JSON local
const JSON_URL = "citations_inspirantes_50.json";

// Éléments HTML
const citationElement = document.getElementById("citation");
const auteurElement = document.getElementById("auteur");

// Tableau qui contiendra les citations du fichier JSON
let citations = [];

// Index de la citation actuellement affichée
let indexCitation = 0;


// ===============================
// CHARGEMENT DU FICHIER JSON
// ===============================

async function chargerCitations() {

    try {

        const response = await fetch(JSON_URL);

        if (!response.ok) {
            throw new Error(`Erreur HTTP : ${response.status}`);
        }

        citations = await response.json();

        // Vérification
        if (!Array.isArray(citations) || citations.length === 0) {
            throw new Error("Le fichier JSON ne contient aucune citation.");
        }

        // Afficher immédiatement la première citation
        afficherCitation();

        // Changer de citation toutes les 5 secondes
        setInterval(changerCitation, 5000);

    } catch (error) {

        console.error("Erreur lors du chargement des citations :", error);

        citationElement.textContent =
            "Impossible de charger les citations.";

        auteurElement.textContent = "";
    }
}


// ===============================
// AFFICHER UNE CITATION
// ===============================

function afficherCitation() {

    const citationActuelle = citations[indexCitation];

    citationElement.textContent =
        `"${citationActuelle.citation}"`;

    auteurElement.textContent =
        `— ${citationActuelle.auteur}`;

}


// ===============================
// CHANGER DE CITATION
// ===============================

function changerCitation() {

    // FADE OUT
    citationElement.classList.add("fade-out");
    auteurElement.classList.add("fade-out");


    // Attendre la fin du fade-out
    setTimeout(() => {

        // Passer à la citation suivante
        indexCitation++;

        // Si on arrive à la fin du tableau,
        // on recommence à zéro
        if (indexCitation >= citations.length) {
            indexCitation = 0;
        }


        // Modifier le texte
        afficherCitation();


        // Retirer fade-out
        citationElement.classList.remove("fade-out");
        auteurElement.classList.remove("fade-out");


        // Ajouter fade-in
        citationElement.classList.add("fade-in");
        auteurElement.classList.add("fade-in");


        // Nettoyer la classe après l'animation
        setTimeout(() => {

            citationElement.classList.remove("fade-in");
            auteurElement.classList.remove("fade-in");

        }, 3000);


    }, 3000);

}


// ===============================
// DÉMARRAGE
// ===============================

chargerCitations();


console.log(`
🏀 ========================================= 🏀

       INITIATIVE AVENIR
       BASKETBALL CLUB

       Révèle ton potentiel.

🏀 ========================================= 🏀
`);

console.log(
    "%cSite officiel :%c Initiative Avenir Basketball Club",
    "color:#c4622d;font-weight:bold;",
    "color:#2e5e4e;"
);

console.log(
    "%cDéveloppé avec ❤️ et JavaScript",
    "color:#888;font-style:italic;",
     "%cDéveloppé par Marc Maurice Freeman"
);
