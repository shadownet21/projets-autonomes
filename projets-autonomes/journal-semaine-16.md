\# Rapport hebdomadaire – Développement du site Initiative Avenir Basketball Club



\*\*Semaine : 16\*\*

\*\*Période : 10 au 13 août 2026\*\*

\*\*Projet : Site web – Initiative Avenir Basketball Club\*\*

\*\*Domaine : Développement Web – HTML, CSS et JavaScript\*\*



\## 1. Objectif de la semaine



Cette semaine, le travail a principalement porté sur l’amélioration du site web \*\*Initiative Avenir Basketball Club\*\*, notamment sur la partie consacrée aux actualités et aux résultats des matchs.



L’objectif était de rendre cette section dynamique en récupérant des informations provenant de fichiers JSON et d’une API de basketball, puis en affichant automatiquement les équipes, leurs logos, les scores et les informations relatives aux matchs.



Des améliorations ont également été apportées à l’affichage responsive du site ainsi qu’à certaines sections de contenu.



\## 2. Travaux réalisés



\### 2.1. Amélioration de la bannière en version mobile



Un travail a été effectué sur la bannière du site afin de mieux positionner son contenu sur les petits écrans.



Le texte placé au-dessus de l’image n’était pas correctement centré sur mobile. La solution a consisté à utiliser un positionnement absolu avec :



```css

top: 50%;

left: 50%;

transform: translate(-50%, -50%);

```



ainsi que :



```css

text-align: center;

align-items: center;

```



Cette modification permet maintenant de conserver le texte au centre de la bannière, quelle que soit la largeur de l’écran.



\## 3. Exploitation de données JSON



Nous avons utilisé deux sources de données différentes.



La première, `basketball.json`, contient principalement les informations permanentes des équipes :



```json

{

&#x20;   "name": "Boston Celtics",

&#x20;   "city": "Boston",

&#x20;   "conference": "Eastern",

&#x20;   "arena": "TD Garden",

&#x20;   "logo": "..."

}

```



La deuxième source contient les matchs et les scores :



```json

{

&#x20;   "home\_team": {

&#x20;       "full\_name": "Boston Celtics"

&#x20;   },

&#x20;   "home\_team\_score": 132,

&#x20;   "visitor\_team": {

&#x20;       "full\_name": "New York Knicks"

&#x20;   },

&#x20;   "visitor\_team\_score": 109

}

```



Le programme récupère maintenant les deux fichiers avec `fetch()` :



```js

const responseTeamsInfos = await fetch("./basketball.json");

const localData = await responseTeamsInfos.json();



const teamsData = localData.teams;



const responseMatchInfo = await fetch("./matchs-scores.json");

const matchInfoData = await responseMatchInfo.json();



const gamesData = matchInfoData.games;

```



Les données sont ensuite transmises à la fonction :



```js

afficherData(teamsData, gamesData);

```



\## 4. Difficulté : `forEach is not a function`



Une des premières erreurs rencontrées était :



```text

matchInfo.forEach is not a function

```



\### Cause



La réponse de l’API n’était pas directement un tableau.



Elle avait plutôt une structure similaire à :



```js

{

&#x20;   data: \[...],

&#x20;   meta: {...}

}

```



Nous essayions donc d'effectuer :



```js

matchInfo.forEach(...)

```



sur un objet.



\### Solution



Nous avons identifié le tableau à l’intérieur de l’objet avant de le parcourir :



```js

const matchInfoData = await responseMatchInfo.json();



afficherData(teamsData, matchInfoData.data);

```



Cette étape a permis de mieux comprendre la différence entre un \*\*objet JSON\*\* et un \*\*tableau JSON\*\*, ainsi que l’importance d’examiner la structure retournée par une API.



\## 5. Conversion des données en JSON exploitable



Les données récupérées depuis la console du navigateur n’étaient pas directement exploitables sous forme de fichier JSON.



Elles contenaient notamment des représentations comme :



```text

Array(13)

{…}

\[\[Prototype]]

```



Un fichier JSON propre a donc été créé afin de conserver les données des matchs dans une structure exploitable par JavaScript.



La structure a notamment été organisée autour de :



```json

{

&#x20;   "games": \[

&#x20;       {

&#x20;           "id": 15907438,

&#x20;           "date": "2024-10-22",

&#x20;           "home\_team": {},

&#x20;           "home\_team\_score": 132,

&#x20;           "visitor\_team": {},

&#x20;           "visitor\_team\_score": 109

&#x20;       }

&#x20;   ]

}

```



Cela a ensuite permis d’utiliser simplement :



```js

const gamesData = matchInfoData.games;

```



\## 6. Association des matchs avec les équipes



Une difficulté importante était que les données relatives aux équipes et celles relatives aux matchs provenaient de deux sources différentes.



Le fichier des matchs possédait le nom de l’équipe :



```js

game.home\_team.full\_name

```



mais pas son logo.



Le logo se trouvait dans :



```js

basketball.json

```



Il fallait donc établir une correspondance entre les deux sources.



\### Solution avec `find()`



Nous avons utilisé :



```js

const homeTeamInfo = teamsInfo.find((team) => {

&#x20;   return team.name === game.home\_team.full\_name;

});

```



et pour l’équipe visiteuse :



```js

const visitorTeamInfo = teamsInfo.find((team) => {

&#x20;   return team.name === game.visitor\_team.full\_name;

});

```



Cela permet par exemple d'associer :



```text

Boston Celtics

```



présent dans le fichier des matchs à :



```json

{

&#x20;   "name": "Boston Celtics",

&#x20;   "logo": "..."

}

```



présent dans le fichier des équipes.



Le logo peut ensuite être récupéré avec :



```js

homeTeamInfo.logo

```



Cette partie du travail a permis de pratiquer concrètement la recherche dans un tableau d’objets avec la méthode JavaScript `find()`.



\## 7. Création dynamique des équipes



Pour chaque match, les éléments HTML sont maintenant créés directement avec JavaScript.



Pour l’équipe à domicile :



```js

const homeTeamDiv = document.createElement("div");

const homeTeamLogo = document.createElement("img");

const homeTeamName = document.createElement("p");

const homeTeamScore = document.createElement("p");

```



Les informations sont ensuite affectées :



```js

homeTeamLogo.src = homeTeamInfo.logo;

homeTeamName.textContent = homeTeamInfo.name;

homeTeamScore.textContent = game.home\_team\_score;

```



Puis ajoutées au conteneur :



```js

homeTeamDiv.append(

&#x20;   homeTeamLogo,

&#x20;   homeTeamName,

&#x20;   homeTeamScore

);

```



La même logique est utilisée pour l’équipe visiteuse.



\## 8. Difficulté : mauvaise organisation des éléments dans le DOM



Au départ, les éléments étaient ajoutés directement dans :



```js

zoneActualites

```



par exemple :



```js

zoneActualites.appendChild(homeTeamDiv);

zoneActualites.appendChild(divDateMatch);

zoneActualites.appendChild(visitorTeamDiv);

```



Cette organisation rendait difficile le positionnement des informations relatives à un même match.



\### Solution



Nous avons décidé de créer un conteneur spécifique pour chaque match :



```js

const matchDiv = document.createElement("section");



matchDiv.classList.add(

&#x20;   "match",

&#x20;   `match-${index + 1}`

);

```



La structure logique devient alors :



```html

<section class="match">



&#x20;   <div class="home-team">

&#x20;       ...

&#x20;   </div>



&#x20;   <div class="match-center">

&#x20;       ...

&#x20;   </div>



&#x20;   <div class="visitor-team">

&#x20;       ...

&#x20;   </div>



</section>

```



Cette structure facilite beaucoup le CSS et permet de bien distinguer chaque rencontre.



\## 9. Positionnement de la date entre les deux équipes



Nous voulions également placer la date et les informations centrales du match entre les deux équipes.



Un conteneur spécifique a donc été créé :



```js

const matchCenter = document.createElement("div");

matchCenter.classList.add("match-center");

```



Il peut contenir :



```js

const vs = document.createElement("span");

vs.textContent = "VS";



const divDateMatch = document.createElement("p");

divDateMatch.textContent = game.date;



const matchStatus = document.createElement("p");

matchStatus.textContent = game.status;

```



Puis :



```js

matchCenter.append(

&#x20;   vs,

&#x20;   divDateMatch,

&#x20;   matchStatus

);

```



La carte du match peut donc prendre la forme suivante :



```text

Boston Celtics             New York Knicks

&#x20;    LOGO                        LOGO



&#x20;    132          VS            109

&#x20;              22/10/2024

&#x20;                 Final

```



\## 10. Difficulté : utilisation de `innerHTML`



Nous avions également un problème avec plusieurs affectations successives :



```js

actualitePrincipale.innerHTML =

&#x20;   `${match.home\_team.full\_name} vs ${match.visitor\_team.full\_name}`;



actualitePrincipale.innerHTML =

&#x20;   `${match.home\_team.logo} vs ${match.visitor\_team.logo}`;

```



La deuxième affectation remplaçait complètement la première.



De plus, les objets provenant du fichier des matchs ne possédaient pas directement de propriété `logo`.



\### Solution



Nous avons séparé chaque élément du contenu en créant de vrais éléments HTML :



```js

const teamLogo = document.createElement("img");

const teamName = document.createElement("p");

```



Cela permet une manipulation beaucoup plus propre du DOM et facilite également la mise en forme CSS.



\## 11. Corrections de code supplémentaires



Plusieurs petites corrections ont également été apportées.



Une classe incorrecte était utilisée pour le score de l’équipe visiteuse :



```js

visitorTeamScore.classList.add("home-team-score");

```



Elle a été remplacée par :



```js

visitorTeamScore.classList.add("visitor-team-score");

```



Des variables inutilisées telles que :



```js

let visitor = 0;

let home = 0;

```



ont également été identifiées comme pouvant être supprimées.



Nous avons également constaté que :



```js

document.createElement("br");

```



ne produit aucun effet si l’élément créé n’est jamais ajouté au DOM.



\## 12. Amélioration du contenu du site



En parallèle du développement JavaScript, plusieurs contenus du site ont été améliorés.



La section \*\*« Qui sommes-nous ? »\*\* a notamment été raccourcie afin de conserver les informations essentielles tout en rendant la lecture plus agréable.



Une section complémentaire a également été envisagée pour afficher des informations sur la saison NBA, afin de compléter les scores et les résultats déjà présents sur la page.



\## 13. Compétences mises en pratique



Cette semaine a permis de renforcer plusieurs compétences importantes en JavaScript et développement front-end :



\* utilisation de `fetch()` pour charger des fichiers JSON ;

\* utilisation de `async/await` ;

\* gestion des erreurs avec `try/catch` ;

\* compréhension des objets et tableaux JSON ;

\* utilisation de `forEach()` ;

\* recherche d’un objet avec `find()` ;

\* manipulation du DOM avec `createElement()` ;

\* utilisation de `append()` et `appendChild()` ;

\* gestion dynamique des classes CSS ;

\* association de données provenant de plusieurs sources ;

\* création dynamique de composants HTML ;

\* organisation du DOM pour faciliter la mise en page ;

\* débogage à l’aide de `console.log()`.



\## 14. Bilan de la semaine



Cette semaine a principalement permis de passer d’une page contenant des informations relativement statiques à une page capable de générer dynamiquement les informations des matchs.



La difficulté principale a été de comprendre et de faire correspondre des données provenant de plusieurs structures JSON différentes. L’utilisation de `find()` a permis de relier les informations des matchs avec les données détaillées des équipes, notamment leurs logos.



Le travail effectué sur la structure du DOM a également permis de rendre le code plus organisé. Chaque rencontre peut maintenant être considérée comme une unité indépendante contenant l’équipe à domicile, les informations centrales du match et l’équipe visiteuse.



Cette progression constitue une étape importante dans le développement du projet, car elle permet désormais d’exploiter des données externes pour créer automatiquement du contenu HTML plutôt que de saisir manuellement chaque information.



