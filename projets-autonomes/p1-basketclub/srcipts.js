 const btnEnvoyer = document.querySelector("#submitForm");
 const champNom = document.querySelector('#nom');
 const champPrenom = document.querySelector('#prenom');
 const champNumeroTelephone = document.querySelector('#tel');
 const champMessage = document.querySelector('#message');
 const champMessageNom = document.querySelector('#message-nom');
 

       btnEnvoyer.addEventListener('click', () => {
    // 1. Récupération des valeurs
    const nom = champNom.value.trim();
    const prenom = champPrenom.value.trim();
    const tel = champNumeroTelephone.value.trim();
    const message = champMessage.value.trim();

    // 2. Réinitialisation des messages d'erreur
    document.querySelectorAll('.danger, .success').forEach(el => {
        el.textContent = '';
        el.classList.remove('danger', 'success');
    });

    let estValide = true;

    // 3. Cas où TOUS les champs sont vides
    if (nom === "" && prenom === "" && tel === "" && message === "") {
        document.querySelector("#all").textContent = "Tous les champs sont obligatoires";
        document.querySelector("#all").classList.add("danger");
        return; // On arrête l'exécution ici
    }

    // 4. Vérification champ par champ
    if (nom === "") {
        document.querySelector("#message-nom").textContent = "Merci de renseigner le nom";
        document.querySelector("#message-nom").classList.add("danger");
        estValide = false;
    }

    if (prenom === "") {
        document.querySelector("#message-prenom").textContent = "Merci de renseigner le prénom";
        document.querySelector("#message-prenom").classList.add("danger");
        estValide = false;
    }

    if (tel === "") {
        document.querySelector("#message-tel").textContent = "Merci de renseigner le numéro de téléphone";
        document.querySelector("#message-tel").classList.add("danger");
        estValide = false;
    }

    if (message === "") {
        document.querySelector("#message-checker").textContent = "Merci de nous laisser un message";
        document.querySelector("#message-checker").classList.add("danger");
        estValide = false;
    }

    // 5. Validation finale
    if (estValide) {
        document.querySelector("#all").textContent = "Formulaire envoyé avec succès";
        document.querySelector("#all").classList.add("success");
    }
});