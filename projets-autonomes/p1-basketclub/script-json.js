

getApiInfo();

async function getApiInfo() {
  try {
    const response = await fetch("https://api.balldontlie.io/v1/games?seasons[]=2024&per_page=13", {
      headers: {
        Authorization: "d37f8225-baca-4cc8-88e9-53909e256755"
      }
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP ! Statut : ${response.status}`);
    }

    const data = await response.json();

    afficherData(data.data);

  } catch (error) {

    console.error("Erreur :", error);

    alert("Erreur : " + error.message);
  }
}



    function afficherData(donnees) {

  console.log(donnees);

  const zoneActualites = document.querySelector(".zone-actualites");

  donnees.forEach((game, index) => {

    // Conteneur principal de chaque partie
    const conteneurPartie = document.createElement("section");
    conteneurPartie.classList.add("conteneur-partie", `partie-${index + 1}`);
    zoneActualites.appendChild(conteneurPartie);

    // Titre principal du match
    const actualitePrincipale = document.createElement("div");
    actualitePrincipale.classList.add("actualite-principale", `actualite-principale-${index + 1}`);
    actualitePrincipale.innerHTML = `${game.home_team.full_name} vs ${game.visitor_team.full_name}`;
    conteneurPartie.appendChild(actualitePrincipale);

    // Grille des 6 petits cubes d'info
    const grillePetitesActualites = document.createElement("div");
    grillePetitesActualites.classList.add("grille-petites-actualites", `grille-petites-actualites-${index + 1}`);
    conteneurPartie.appendChild(grillePetitesActualites);

    // Cube 1 — Équipe à domicile
    const cube01 = document.createElement("article");
    cube01.classList.add("petite-actualite", "petite-actualite-01");
    cube01.innerHTML = `
      <h3>${game.home_team.full_name}</h3>
      <p>${game.home_team.conference} • ${game.home_team.division}</p>
      <p>${game.home_team.city}</p>
    `;
    grillePetitesActualites.appendChild(cube01);

    // Cube 2 — Équipe visiteuse
    const cube02 = document.createElement("article");
    cube02.classList.add("petite-actualite", "petite-actualite-02");
    cube02.innerHTML = `
      <h3>${game.visitor_team.full_name}</h3>
      <p>${game.visitor_team.conference} • ${game.visitor_team.division}</p>
      <p>${game.visitor_team.city}</p>
    `;
    grillePetitesActualites.appendChild(cube02);

    // Cube 3 — Scores par quart-temps, domicile
    const cube03 = document.createElement("article");
    cube03.classList.add("petite-actualite", "petite-actualite-03");
    cube03.innerHTML = `
      <h3>${game.home_team.name} — Quart-temps</h3>
      <p>${game.home_q1 ?? "-"} / ${game.home_q2 ?? "-"} / ${game.home_q3 ?? "-"} / ${game.home_q4 ?? "-"}</p>
    `;
    grillePetitesActualites.appendChild(cube03);

    // Cube 4 — Scores par quart-temps, visiteur
    const cube04 = document.createElement("article");
    cube04.classList.add("petite-actualite", "petite-actualite-04");
    cube04.innerHTML = `
      <h3>${game.visitor_team.name} — Quart-temps</h3>
      <p>${game.visitor_q1 ?? "-"} / ${game.visitor_q2 ?? "-"} / ${game.visitor_q3 ?? "-"} / ${game.visitor_q4 ?? "-"}</p>
    `;
    grillePetitesActualites.appendChild(cube04);

    // Cube 5 — Score final
    const cube05 = document.createElement("article");
    cube05.classList.add("petite-actualite", "petite-actualite-05");
    cube05.innerHTML = `
      <h3>Score final</h3>
      <p>${game.home_team.name} ${game.home_team_score} - ${game.visitor_team_score} ${game.visitor_team.name}</p>
    `;
    grillePetitesActualites.appendChild(cube05);

    // Cube 6 — Date et statut
    const cube06 = document.createElement("article");
    cube06.classList.add("petite-actualite", "petite-actualite-06");
    cube06.innerHTML = `
      <h3>Infos match</h3>
      <p>Date : ${game.date}</p>
      <p>Statut : ${game.status}</p>
    `;
    grillePetitesActualites.appendChild(cube06);

  });

}