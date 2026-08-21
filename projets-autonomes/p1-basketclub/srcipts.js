//Chargement progressif du paragraphe au raffraichissement de la page contact.
window.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll("[data-animate]");

  setTimeout(() => {
    elements.forEach((element) => {
      element.classList.add("is-loaded");
    });
  }, 150);
});



 
 
 
 
 const btnEnvoyer = document.querySelector("#submitForm");
 const champNom = document.querySelector('#nom');
 const champPrenom = document.querySelector('#prenom');
 const champNumeroTelephone = document.querySelector('#tel');
 const champMessage = document.querySelector('#message');
 const champMessageNom = document.querySelector('#message-nom');
 const champEmail = document.querySelector('#email');
 const formulaire = document.querySelector("form"); // Adaptez le sélecteur si besoin
 const messageEmail = document.querySelector("#message-email");
 // Expression régulière pour valider le format standard xxxx@yyy.zzz
 const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

       btnEnvoyer.addEventListener('click', () => {
    // 1. Récupération des valeurs
    const nom = champNom.value.trim();
    const prenom = champPrenom.value.trim();
    const tel = champNumeroTelephone.value.trim();
    const message = champMessage.value.trim();
    const email = champEmail.value.trim();

    // 2. Réinitialisation des messages d'erreur
    document.querySelectorAll('.danger, .success').forEach(el => {
        el.textContent = '';
        el.classList.remove('danger', 'success');
    });

    let estValide = true;

    // 3. Cas où TOUS les champs sont vides
    if (nom === "" && prenom === "" && tel === "" && message === "" && email === "") {
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
    } else if (tel.length < 10) {
        // Vérifie si la chaîne saisie contient moins de 10 caractères
        document.querySelector("#message-tel").textContent = "Le numéro de téléphone doit contenir au moins 10 caractères";
        document.querySelector("#message-tel").classList.add("danger");
        estValide = false;
    } else {
        // Nettoie l'erreur si le champ est valide
        document.querySelector("#message-tel").textContent = "";
        document.querySelector("#message-tel").classList.remove("danger");
    }

    if (message === "") {
        document.querySelector("#message-checker").textContent = "Merci de nous laisser un message";
        document.querySelector("#message-checker").classList.add("danger");
        estValide = false;
    }

    if (email === "") {         
        document.querySelector("#message-email").textContent = "Merci de renseigner votre adresse courriel";         
        document.querySelector("#message-email").classList.add("danger");         
        estValide = false;     
    } else if (!emailRegex.test(email)) { 
        // Ce bloc s'exécute si l'email n'est pas vide mais que son format est incorrect
        document.querySelector("#message-email").textContent = "Le format de l'adresse courriel est invalide (ex: nom@domaine.com)";         
        document.querySelector("#message-email").classList.add("danger");         
        estValide = false; 
    } else {
        // Optionnel : Nettoyer le message d'erreur si l'email est correct
        document.querySelector("#message-email").textContent = "";
        document.querySelector("#message-email").classList.remove("danger");
    }

    // 5. Validation finale
    if (estValide) {
        document.querySelector("#all").textContent = "Formulaire envoyé avec succès";
        document.querySelector("#all").classList.add("success");
        
       setTimeout(() => {
        // Vide tous les champs de saisie du formulaire d'un coup
        formulaire.reset(); 
        
        // Efface aussi le message de succès
        messageEmail.textContent = "";
        messageEmail.classList.remove("success");
    }, 2000);
    }
});



