getApiInfo();

async function getApiInfo() {
  try {
    const response = await fetch("https://dragonball-api.com/api/planets");

    if (!response.ok) {
      throw new Error(`Erreur HTTP ! Statut : ${response.status}`);
    }

    const data = await response.json();

    afficherData(data);
  } catch (error) {
    console.error("Erreur :", error);

    alert("Erreur : " + error.message);
  }
}

function afficherData(data) {
  const donnees = data.items;
  console.log(donnees);

  let div_principal = document.createElement("div");

    div_principal.classList = "content";

  for (let i = 0; i < donnees.length; i++) {

    let etat = donnees[i].isDestroyed ? "Détruite" : "Non détruite";

    let div_cards = document.createElement("div");

    div_cards.classList = "card";

    div_cards.innerHTML = `
                            <p>N.  ${donnees[i].id} </p>
                            <h3> Titre : ${donnees[i].name} </h3>
                            <img class="image" src="${donnees[i].image}"/>
                            <p><u>Etat</u> :  ${etat} </p>
                            <p class="description"><i> ${donnees[i].description} </i></p>
                         `;

    div_principal.appendChild(div_cards);

    document.body.appendChild(div_principal);
  }
}
