const apiBaseURL = "https://deckofcardsapi.com/api/deck/";
let deckID = null;

// Fonction asynchrone qui va permettre de faire des requêtes à l'API
async function callAPI(uri) {
    try {
    // Attente de la réponse à la requête (fetch), envoie une requête HTTP
    console.log("--callAPI - start --")
    const response = await fetch(uri);
    
    // Attente de la transformation des données en format JSON
    const data = await response.json();
    console.log("data =",data)
    // Retourne les données récupérées de l'API sous forme de tableau associatif (objet)
    return data;
}catch (error) {
    console.error("Erreur lors de l'appel à l'API :", error);
    alert("Une erreur est survenue lors de la communication avec l'API.");
}
}

// Fonction asynchrone pour réinitialiser le jeu de cartes
async function actionReset() {
    // Appel à l'API pour récupérer un nouveau deck et le mélanger (new + shuffle)
    const newDeck = await callAPI(`${apiBaseURL}new/shuffle/`);
    
    // On stocke l'ID du nouveau deck (qui sera utile pour d'autres actions)
    deckID = newDeck.deck_id;
    
    // On vide le conteneur des cartes affichées sur l'écran (reset visuel)
    document.getElementById('cards-container').innerHTML = '';
}

// Fonction asynchrone pour piocher une carte
async function actionDraw() {
    // Vérifie si le deck a été réinitialisé (sinon, affiche une alerte)
    if (!deckID) {
        alert("Veuillez d'abord réinitialiser le deck !");
        return;
    }

    // Appel à l'API pour piocher une carte dans le deck actuel
    const drawResponse = await callAPI(`${apiBaseURL}${deckID}/draw/?count=1`);

    // Si l'API retourne une carte, on l'affiche
    if (drawResponse.cards.length > 0) {
        const card = drawResponse.cards[0]; // Récupération de la première carte
        displayCard(card.image); // Affichage de l'image de la carte
    }
}

// Fonction synchrone pour afficher une carte dans le DOM
function displayCard(cardImageURL) {
    // Sélectionne le conteneur où les cartes sont affichées
    const cardContainer = document.getElementById('cards-container');
    
    // Crée un nouvel élément <img> pour afficher l'image de la carte
    const cardElement = document.createElement('img');
    
    // Spécifie la source de l'image (l'URL de l'image de la carte)
    cardElement.src = cardImageURL;
    
    // Ajoute une classe CSS à l'image (pour le style)
    cardElement.className = 'card';
    
    // Ajoute l'image de la carte dans le conteneur HTML
    cardContainer.appendChild(cardElement);
}

// Associe l'action du bouton "Réinitialiser le deck" à la fonction actionReset
document.getElementById('action-reset').addEventListener('click', actionReset);

// Associe l'action du bouton "Piocher une carte" à la fonction actionDraw
document.getElementById('action-draw').addEventListener('click', actionDraw);
``
