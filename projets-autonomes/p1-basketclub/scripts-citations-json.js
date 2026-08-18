const API_BASE_URL = 'https://dummyjson.com';

// Fonction pour récupérer une citation aléatoire
async function getRandomQuote() {
    try {
        const response = await fetch(`${API_BASE_URL}/quotes/random`);

        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const data = await response.json();

        // data = { id, quote, author }
        return data;
    } catch (error) {
        console.error('Erreur lors de la récupération de la citation:', error);
        throw error;
    }
}

// Fonction pour rechercher plusieurs citations aléatoires
// (DummyJSON n'a pas de recherche par auteur, donc on récupère une page
// et on filtre côté client — voir la note plus bas si tu veux vraiment filtrer par auteur)
async function getRandomQuotes(limit = 10) {
    try {
        const response = await fetch(`${API_BASE_URL}/quotes/random/${limit}`);

        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const data = await response.json();
        return data; // tableau de citations
    } catch (error) {
        console.error('Erreur lors de la récupération des citations:', error);
        throw error;
    }
}


async function obtenirCitation() {
    try {
        const quoteData = await getRandomQuote();
        const citation = document.getElementById('citation');
        const auteur = document.getElementById('auteur');
                 
                citation.style.color = 'black';
                auteur.style.color = 'black';

                citation.textContent = `"${quoteData.quote}"`;
                citation.classList.add("citations");
                auteur.textContent = `From :  ${quoteData.author}`;
    } catch (error) {
        document.getElementById('citations').innerHTML +=
            `<p style="color:red;">Impossible de charger la citation. Réessaie plus tard.</p>`;
    }
}