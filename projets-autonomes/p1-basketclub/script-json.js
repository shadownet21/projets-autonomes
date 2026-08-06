

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

      const parent = document.querySelector("#grille-petites-actualites"); 

      const article1 = document.querySelector("#article-1"); 
      const article2 = document.querySelector("#article-2"); 
      const article3 = document.querySelector("#article-3"); 
      const article4 = document.querySelector("#article-4"); 
      const article5 = document.querySelector("#article-5"); 
      const article6 = document.querySelector("#article-6"); 
      const article7 = document.querySelector("#article-7"); 
      const article8 = document.querySelector("#article-8"); 
      const article9 = document.querySelector("#article-9"); 
      const article10 = document.querySelector("#article-10"); 
      const article11 = document.querySelector("#article-11"); 
      const article12 = document.querySelector("#article-12"); 
      const article13 = document.querySelector("#article-13"); 
       

      donnees.forEach((game, index) => {
      
        let scoreDiv = document.createElement("div");
        scoreDiv.classList.add("petite-actualite");
        scoreDiv.classList.add(`actualite-${index + 1}`);



      
      article1.innerHTML = `<h2>${game.home_team.name} vs ${game.visitor_team.name}`;
      article2.innerHTML = `<h2>${game.home_team.name} vs ${game.visitor_team.name}`;
      article3.innerHTML = `<h2>${game.home_team.name} vs ${game.visitor_team.name}`;
      article4.innerHTML = `<h2>${game.home_team.name} vs ${game.visitor_team.name}`;
      article5.innerHTML = `<h2>${game.home_team.name} vs ${game.visitor_team.name}`;
      article6.innerHTML = `<h2>${game.home_team.name} vs ${game.visitor_team.name}`;
      article7.innerHTML = `<h2>${game.home_team.name} vs ${game.visitor_team.name}`;
      article8.innerHTML = `<h2>${game.home_team.name} vs ${game.visitor_team.name}`;
      article9.innerHTML = `<h2>${game.home_team.name} vs ${game.visitor_team.name}`;
      article10.innerHTML = `<h2>${game.home_team.name} vs ${game.visitor_team.name}`;
      article11.innerHTML = `<h2>${game.home_team.name} vs ${game.visitor_team.name}`;
      article12.innerHTML = `<h2>${game.home_team.name} vs ${game.visitor_team.name}`;
      article13.innerHTML = `<h2>${game.home_team.name} vs ${game.visitor_team.name}`;

   /*     parent.appendChild(article1);
       parent.appendChild(article2);
       parent.appendChild(article3);
       parent.appendChild(article4);
       parent.appendChild(article4);
       parent.appendChild(article5);
       parent.appendChild(article6);
       parent.appendChild(article7);
       parent.appendChild(article8);
       parent.appendChild(article9);
       parent.appendChild(article10);
       parent.appendChild(article11);
       parent.appendChild(article12);
       parent.appendChild(article13); */
    }) 

}