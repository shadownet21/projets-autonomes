getApiInfo();

async function getApiInfo() {
  try {
    const response = await fetch("https://kaylanhusband.github.io/BasketballHeadDocs/basketball_head_openapi.json");

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
  const donnees = data;
  console.log(donnees);


    for (let i = 0; i < donnees.lenght; i++) {

        console.log(donnees[i]);

    }

}
