"use strict";

/* =========================================================
   1. CONFIGURATION
========================================================= */

const API_URL =
    "https://kaylanhusband.github.io/BasketballHeadDocs/basketball_head_openapi.json";

const IMAGE_PAR_DEFAUT = "images/basket-default.jpg";

const NOMBRE_ARTICLES = 12;


/* =========================================================
   2. DÉMARRAGE DE L’APPLICATION
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    chargerMatchs();
});


/* =========================================================
   3. RÉCUPÉRER LES DONNÉES DE L’API
========================================================= */

async function chargerMatchs() {
    afficherChargement();

    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(
                `Erreur HTTP : ${response.status}`
            );
        }

        const data = await response.json();

        if (!data.events || data.events.length === 0) {
            throw new Error(
                "Aucun match n’est disponible actuellement."
            );
        }

        afficherMatchs(data.events);
        afficherInformationsComplementaires(data.events);

    } catch (error) {
        console.error(
            "Erreur pendant le chargement des matchs :",
            error
        );

        afficherErreur(error.message);
    }
}


/* =========================================================
   4. AFFICHER LES MATCHS DANS LES 12 ARTICLES
========================================================= */

function afficherMatchs(matchs) {
    const articles = obtenirArticles();

    for (let i = 0; i < articles.length; i++) {
        const article = articles[i];
        const match = matchs[i];

        /*
         * L’API peut retourner moins de 12 matchs.
         * Dans ce cas, on affiche un contenu d’attente.
         */
        if (!match) {
            afficherArticleIndisponible(article);
            continue;
        }

        const informations = preparerInformationsMatch(match, i);

        article.innerHTML = creerContenuArticle(informations);

        ajouterGestionErreurImage(article);
    }
}


/* =========================================================
   5. RÉCUPÉRER LES 12 ARTICLES HTML
========================================================= */

function obtenirArticles() {
    const articles = [];

    for (let i = 1; i <= NOMBRE_ARTICLES; i++) {
        const article = document.querySelector(
            `#article-${i}`
        );

        if (article) {
            articles.push(article);
        }
    }

    return articles;
}


/* =========================================================
   6. PRÉPARER LES INFORMATIONS D’UN MATCH
========================================================= */

function preparerInformationsMatch(match, position) {
    const equipeDomicile =
        match.strHomeTeam || "Équipe domicile";

    const equipeExterieure =
        match.strAwayTeam || "Équipe extérieure";

    return {
        categorie: determinerCategorie(match, position),

        titre:
            match.strEvent ||
            `${equipeDomicile} vs ${equipeExterieure}`,

        equipeDomicile,

        equipeExterieure,

        date: formaterDate(match.dateEvent),

        heure: formaterHeure(match.strTime),

        score: creerScore(match),

        lieu:
            match.strVenue ||
            "Lieu non communiqué",

        statut: traduireStatut(match.strStatus),

        image: choisirImage(match),

        description: creerDescription(match)
    };
}


/* =========================================================
   7. CRÉER LE CONTENU HTML D’UN ARTICLE
========================================================= */

function creerContenuArticle(informations) {
    return `
        <img
            class="image-actualite"
            src="${informations.image}"
            alt="${informations.titre}"
        >

        <div class="filtre-actualite"></div>

        <div class="contenu-actualite">

            <span class="categorie-actualite">
                ${informations.categorie}
            </span>

            <h2>
                ${informations.titre}
            </h2>

            <p class="date-actualite">
                ${informations.date}
                ·
                ${informations.heure}
            </p>

            <strong class="score-actualite">
                ${informations.score}
            </strong>

            <p class="description-actualite">
                ${informations.description}
            </p>

            <p class="lieu-actualite">
                ${informations.lieu}
            </p>

            <span class="statut-actualite">
                ${informations.statut}
            </span>

        </div>
    `;
}


/* =========================================================
   8. DÉTERMINER LA CATÉGORIE SELON LE BLOC
========================================================= */

function determinerCategorie(match, position) {
    const scoreDisponible =
        match.intHomeScore !== null &&
        match.intHomeScore !== undefined &&
        match.intAwayScore !== null &&
        match.intAwayScore !== undefined;

    /*
     * Premier grand bloc.
     */
    if (position === 0) {
        return scoreDisponible
            ? "Match à la une"
            : "Prochain grand match";
    }

    /*
     * Petits blocs 2 à 4.
     */
    if (position >= 1 && position <= 3) {
        return scoreDisponible
            ? "Résultat"
            : "À surveiller";
    }

    /*
     * Petits blocs 5 à 7.
     */
    if (position >= 4 && position <= 6) {
        return "Prochain match";
    }

    /*
     * Blocs de droite 8 et 9.
     */
    if (position === 7) {
        return "Affiche du jour";
    }

    if (position === 8) {
        return "Duel à suivre";
    }

    /*
     * Deuxième grand bloc.
     */
    if (position === 9) {
        return "Actualité NBA";
    }

    /*
     * Derniers blocs de droite.
     */
    return scoreDisponible
        ? "Dernier résultat"
        : "Calendrier";
}


/* =========================================================
   9. CRÉER LE SCORE
========================================================= */

function creerScore(match) {
    const scoreDomicile = match.intHomeScore;
    const scoreExterieur = match.intAwayScore;

    const scoreDisponible =
        scoreDomicile !== null &&
        scoreDomicile !== undefined &&
        scoreExterieur !== null &&
        scoreExterieur !== undefined;

    if (!scoreDisponible) {
        return "Match à venir";
    }

    return `${scoreDomicile} — ${scoreExterieur}`;
}


/* =========================================================
   10. CRÉER UNE DESCRIPTION
========================================================= */

function creerDescription(match) {
    const equipeDomicile =
        match.strHomeTeam || "L’équipe à domicile";

    const equipeExterieure =
        match.strAwayTeam || "l’équipe visiteuse";

    const scoreDisponible =
        match.intHomeScore !== null &&
        match.intHomeScore !== undefined &&
        match.intAwayScore !== null &&
        match.intAwayScore !== undefined;

    if (scoreDisponible) {
        return (
            `${equipeDomicile} et ${equipeExterieure} ` +
            "se sont affrontés dans cette rencontre."
        );
    }

    return (
        `${equipeDomicile} affrontera ${equipeExterieure} ` +
        "dans une rencontre à suivre."
    );
}


/* =========================================================
   11. CHOISIR L’IMAGE
========================================================= */

function choisirImage(match) {
    const image =
        match.strThumb ||
        match.strPoster ||
        match.strFanart ||
        match.strBanner;

    if (!image || image.trim() === "") {
        return "./images/basket-default.jpg";
    }

    return image;
}


/* =========================================================
   12. REMPLACER UNE IMAGE QUI NE CHARGE PAS
========================================================= */

function ajouterGestionErreurImage(article) {
    const image = article.querySelector(".image-actualite");

    if (!image) {
        return;
    }

    image.addEventListener("error", () => {
        image.remove();

        article.classList.add("sans-image");
    });
}

/* =========================================================
   13. FORMATER LA DATE
========================================================= */

function formaterDate(dateMatch) {
    if (!dateMatch) {
        return "Date non communiquée";
    }

    const date = new Date(`${dateMatch}T00:00:00`);

    if (Number.isNaN(date.getTime())) {
        return dateMatch;
    }

    return date.toLocaleDateString("fr-CA", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });
}


/* =========================================================
   14. FORMATER L’HEURE
========================================================= */

function formaterHeure(heureMatch) {
    if (!heureMatch) {
        return "Heure à confirmer";
    }

    return heureMatch.substring(0, 5);
}


/* =========================================================
   15. TRADUIRE LE STATUT
========================================================= */

function traduireStatut(statut) {
    if (!statut) {
        return "Horaire à confirmer";
    }

    const statuts = {
        "Not Started": "À venir",
        "Match Finished": "Match terminé",
        "Finished": "Match terminé",
        "In Progress": "En direct",
        "Postponed": "Reporté",
        "Cancelled": "Annulé"
    };

    return statuts[statut] || statut;
}


/* =========================================================
   16. AFFICHAGE PENDANT LE CHARGEMENT
========================================================= */

function afficherChargement() {
    const articles = obtenirArticles();

    for (const article of articles) {
        article.innerHTML = `
            <div class="etat-article">
                <p>Chargement des matchs...</p>
            </div>
        `;
    }

    const blocInfo = document.querySelector(
        "#info-complementaire"
    );

    if (blocInfo) {
        blocInfo.innerHTML = `
            <p>Chargement du calendrier...</p>
        `;
    }
}


/* =========================================================
   17. ARTICLE UTILISÉ S’IL MANQUE UN MATCH
========================================================= */

function afficherArticleIndisponible(article) {
    article.classList.add("sans-image");

    article.innerHTML = `
        <div class="contenu-actualite contenu-indisponible">

            <span class="categorie-actualite">
                Calendrier
            </span>

            <h2>Prochain match</h2>

            <p class="description-actualite">
                Le calendrier complet sera publié prochainement.
            </p>

            <span class="icone-basket">
                🏀
            </span>

        </div>
    `;
}


/* =========================================================
   18. AFFICHER LES INFORMATIONS COMPLÉMENTAIRES
========================================================= */

function afficherInformationsComplementaires(matchs) {
    const blocInfo = document.querySelector(
        "#info-complementaire"
    );

    if (!blocInfo) {
        return;
    }

    const premierMatch = matchs[0];

    blocInfo.innerHTML = `
        <h2>Calendrier NBA</h2>

        <p>
            <strong>${matchs.length}</strong>
            rencontre(s) disponible(s).
        </p>

        <hr>

        <h3>Prochaine affiche</h3>

        <p>
            ${
                premierMatch.strHomeTeam ||
                "Équipe domicile"
            }
            contre
            ${
                premierMatch.strAwayTeam ||
                "Équipe extérieure"
            }
        </p>

        <p>
            ${formaterDate(premierMatch.dateEvent)}
            à
            ${formaterHeure(premierMatch.strTime)}
        </p>

        <p>
            ${
                premierMatch.strVenue ||
                "Lieu à confirmer"
            }
        </p>
    `;
}


/* =========================================================
   19. AFFICHER UNE ERREUR SUR LA PAGE
========================================================= */

function afficherErreur(message) {
    const articles = obtenirArticles();

    for (const article of articles) {
        article.innerHTML = `
            <div class="etat-article erreur-article">
                <h3>Contenu indisponible</h3>

                <p>
                    Impossible de charger les informations.
                </p>
            </div>
        `;
    }

    const blocInfo = document.querySelector(
        "#info-complementaire"
    );

    if (blocInfo) {
        blocInfo.innerHTML = `
            <h3>Erreur de chargement</h3>
            <p>${message}</p>
        `;
    }
}