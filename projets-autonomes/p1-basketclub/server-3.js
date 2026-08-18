getApiLocalInfo();
getApiInfo();


async function getApiLocalInfo() {
  try {
      // FIRST API
      const responseTeamsInfos = await fetch("./basketball.json");

    if (!responseTeamsInfos.ok) {
      throw new Error(`Erreur HTTP ! Statut : ${responseTeamsInfos.status}`);
    }

    const localData = await responseTeamsInfos.json();
    const teamsData = localData.teams

    // SECOND API
    const responseMatchInfo = await fetch("./matchs-scores.json");
    


    if (!responseMatchInfo.ok) {
      throw new Error(`Erreur HTTP ! Statut : ${responseMatchInfo.status}`);
    }

    const matchInfoData = await responseMatchInfo.json();
    const gamesData  = matchInfoData.games;

    afficherData(teamsData, gamesData);

  } catch (error) {

    console.error("Erreur :", error);

    alert("Erreur : " + error.message);

  }
}

function afficherData(teamsInfo, gamesInfo) {
 
      const zoneActualites = document.querySelector(".zone-actualites");

      let visitor = 0;
      let home = 0;
 
      gamesInfo.forEach((game, index) => {


                      const gameContainer = document.createElement("div");
                      gameContainer.classList.add("game-container");
        
                      // Trouver l'équipe domicile
                      const homeTeamInfo = teamsInfo.find((team) => {
                          return team.name === game.home_team.full_name;
                      });


                      // HOME TEAM
                      if (homeTeamInfo) {

                          const homeTeamDiv = document.createElement("div");
                          homeTeamDiv.classList.add("home-team");

                          const homeTeamLogo = document.createElement("img");

                          homeTeamLogo.classList.add(
                              "home-team-logo",
                              `home-team-logo-${index + 1}`
                          );

                          homeTeamLogo.src = homeTeamInfo.logo;
                          homeTeamLogo.alt = `Logo ${homeTeamInfo.name}`;


                          const homeTeamName = document.createElement("p");

                          homeTeamName.classList.add("home-team-name");
                          homeTeamName.textContent = homeTeamInfo.name;


                          const homeTeamScore = document.createElement("p");
                          homeTeamScore.classList.add("home-team-score");
                          homeTeamScore.textContent = game.home_team_score;


                            homeTeamDiv.append(
                                homeTeamLogo,
                                homeTeamName,
                                homeTeamScore
                            );

    gameContainer.appendChild(homeTeamDiv);
}



// Trouver l'équipe visiteuse
const visitorTeamInfo = teamsInfo.find((team) => {
    return team.name === game.visitor_team.full_name;
});


 const divDateMatch  = document.createElement("div");

divDateMatch.classList.add("centre");
divDateMatch.classList.add("badge-secondary-match-date");

divDateMatch.textContent = game.date;

gameContainer.appendChild(divDateMatch); 

// VISITOR TEAM
if (visitorTeamInfo) {

    const visitorTeamDiv = document.createElement("div");
    visitorTeamDiv.classList.add("visitor-team");

    const visitorTeamLogo = document.createElement("img");

    visitorTeamLogo.classList.add(
        "visitor-team-logo",
        `visitor-team-logo-${index + 1}`
    );

    visitorTeamLogo.src = visitorTeamInfo.logo;
    visitorTeamLogo.alt = `Logo ${visitorTeamInfo.name}`;


    const visitorTeamName = document.createElement("p");

    visitorTeamName.classList.add("visitor-team-name");
    visitorTeamName.textContent = visitorTeamInfo.name;


    const visitorTeamScore = document.createElement("p");
    visitorTeamScore.classList.add("home-team-score");
    visitorTeamScore.textContent = game.visitor_team_score;

    visitorTeamDiv.append(
        visitorTeamLogo,
        visitorTeamName,
        visitorTeamScore
    );

     // Image "VS" locale entre les deux équipes
    const vsImage = document.createElement("img");
    vsImage.src = "images/versus.png"; 
    vsImage.alt = "VS";
    vsImage.classList.add("versus-matchs");
  
    

    gameContainer.appendChild(vsImage);
    gameContainer.appendChild(visitorTeamDiv);
}

zoneActualites.appendChild(gameContainer);


    })
}

 
 

// function afficherData(teamInfo, matchInfo) {
   
//   console.log(teamInfo, matchInfo);

//       const zoneActualites = document.querySelector(".zone-actualites"); 



//     teamInfo.forEach((team, index) => {

//         matchInfo.forEach((match, index) => {

//              // Conteneur principal de chaque partie
//     const conteneurPartie = document.createElement("section");
//     conteneurPartie.classList.add("conteneur-partie", `partie-${index + 1}`);
//     zoneActualites.appendChild(conteneurPartie);

//     // Titre principal du match
//     const actualitePrincipale = document.createElement("div");
//     actualitePrincipale.classList.add("actualite-principale", `actualite-principale-${index + 1}`);
//     actualitePrincipale.innerHTML = `${match.home_team.full_name} vs ${match.visitor_team.full_name}`;
//     actualitePrincipale.innerHTML = `${match.home_team.logo} vs ${match.visitor_team.logo }`;  //ici tu dois comparer les noms dans les deux équipes et afficher les logos correspondantes.

//     conteneurPartie.appendChild(actualitePrincipale);

//     // Grille des 6 petits cubes d'info
//     const grillePetitesActualites = document.createElement("div");
//     grillePetitesActualites.classList.add("grille-petites-actualites", `grille-petites-actualites-${index + 1}`);
//     conteneurPartie.appendChild(grillePetitesActualites);

//     // Cube 1 — Équipe à domicile
//     const cube01 = document.createElement("article");
//     cube01.classList.add("petite-actualite", "petite-actualite-01");
//     cube01.innerHTML = `
//       <h3>${match.home_team.full_name}</h3>
//       <p>${match.home_team.conference} • ${match.home_team.division}</p>
//       <p>${match.home_team.city}</p>
//     `;
//     grillePetitesActualites.appendChild(cube01);

//     // Cube 2 — Équipe visiteuse
//     const cube02 = document.createElement("article");
//     cube02.classList.add("petite-actualite", "petite-actualite-02");
//     cube02.innerHTML = `
//       <h3>${match.visitor_team.full_name}</h3>
//       <p>${match.visitor_team.conference} • ${match.visitor_team.division}</p>
//       <p>${match.visitor_team.city}</p>
//     `;
//     grillePetitesActualites.appendChild(cube02);

//     // Cube 3 — Scores par quart-temps, domicile
//     const cube03 = document.createElement("article");
//     cube03.classList.add("petite-actualite", "petite-actualite-03");
//     cube03.innerHTML = `
//       <h3>${match.home_team.name} — Quart-temps</h3>
//       <p>${match.home_q1 ?? "-"} / ${match.home_q2 ?? "-"} / ${match.home_q3 ?? "-"} / ${match.home_q4 ?? "-"}</p>
//     `;
//     grillePetitesActualites.appendChild(cube03);

//     // Cube 4 — Scores par quart-temps, visiteur
//     const cube04 = document.createElement("article");
//     cube04.classList.add("petite-actualite", "petite-actualite-04");
//     cube04.innerHTML = `
//       <h3>${match.visitor_team.name} — Quart-temps</h3>
//       <p>${match.visitor_q1 ?? "-"} / ${match.visitor_q2 ?? "-"} / ${match.visitor_q3 ?? "-"} / ${match.visitor_q4 ?? "-"}</p>
//     `;
//     grillePetitesActualites.appendChild(cube04);

//     // Cube 5 — Score final
//     const cube05 = document.createElement("article");
//     cube05.classList.add("petite-actualite", "petite-actualite-05");
//     cube05.innerHTML = `
//       <h3>Score final</h3>
//       <p>${match.home_team.name} ${match.home_team_score} - ${match.visitor_team_score} ${match.visitor_team.name}</p>
//     `;
//     grillePetitesActualites.appendChild(cube05);

//     // Cube 6 — Date et statut
//     const cube06 = document.createElement("article");
//     cube06.classList.add("petite-actualite", "petite-actualite-06");
//     cube06.innerHTML = `
//       <h3>Infos match</h3>
//       <p>Date : ${match.date}</p>
//       <p>Statut : ${match.status}</p>
//     `;
//     grillePetitesActualites.appendChild(cube06);

//   });
    
// });










      // const homeTeam = teamInfo.find((team) => { return team.logo === match.home_team.full_name;         });

/*       matchInfo.forEach((match, index) => {

              // console.log(teamInfo.name);
        
              // // Conteneur princpal de chaque équipe
              // const conteneurTeam = document.createElement("section");
              // conteneurTeam.classList.add("conteneur-equipe");
              // conteneurTeam.classList.add(`conteneur-equipe-${index + 1}`);
              
              // // Conteneur d'information écrite de chaque équipe
              // const teamInfo = document.createElement("div");
              // teamInfo.classList.add("team-info");
              // teamInfo.classList.add(`team-info-${index + 1}`);
              // conteneurTeam.appendChild(teamInfo);
        
              // const teamName = document.createElement("span");
              // teamName.classList.add("team-name");
              // teamInfo.classList.add(`team-name-${index + 1}`);
              // teamInfo.innerHTML = team.name;
              // teamInfo.appendChild(teamName);
        
              // const teamLogo = document.createElement("img");
              // teamLogo.classList.add("team-Logo");
              // teamLogo.classList.add(`team-logo-${index + 1}`);
              // teamLogo.src = team.logo;
              // conteneurTeam.appendChild(teamLogo);
        
        
             zoneActualites.appendChild(conteneurTeam);
          });   */


      //});

//}