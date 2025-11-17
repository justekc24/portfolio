// Étape 5: Interaction avec JavaScript (Validation du Formulaire)
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const errorMessage = document.getElementById('error-message');

    // Cibler les champs pour faciliter la vérification
    const prenomInput = document.getElementById('prenom');
    const nomInput = document.getElementById('nom');
    const sujetInput = document.getElementById('sujet');
    const messageInput = document.getElementById('message');

    form.addEventListener('submit', function(event) {
        // Empêche l'envoi du formulaire par défaut (rechargement de la page)
        event.preventDefault(); 
        
        // Récupérer les valeurs nettoyées des espaces blancs
        const prenom = prenomInput.value.trim();
        const nom = nomInput.value.trim();
        const sujet = sujetInput.value.trim();
        const message = messageInput.value.trim();
        
        let isValid = true;
        let errors = [];

            // Fonction de vérification de champ vide
            const checkField = (value, fieldName) => {
                if (value === '') {
                    errors.push(`${fieldName} est requis.`);
                    isValid = false;
                }
            };

        // Validation de chaque champ
        checkField(prenom, 'Le prénom');
        checkField(nom, 'Le nom');
        checkField(sujet, 'Le sujet');
        checkField(message, 'Le message');

        // Affichage du résultat
        if (!isValid) {
            // Afficher le message d'erreur
            errorMessage.textContent = 'Veuillez remplir tous les champs: ' + errors.join(' ');
            errorMessage.style.display = 'block';
        } else {
            // Si le formulaire est valide, masquer l'erreur et simuler l'envoi
            errorMessage.style.display = 'none';
            // Ici on pourrait envoyer via fetch() vers un endpoint, pour l'instant on simule
            alert('Votre message a été envoyé avec succès ! (Simulation)');
            // Réinitialiser le formulaire
            form.reset();
        }
    });

    // Optionnel: Ajouter un défilement fluide pour les liens de navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetSelector = this.getAttribute('href');
            // Empêche le comportement de saut rapide par défaut
            if (!targetSelector || targetSelector === '#') return;
            e.preventDefault();
            const target = document.querySelector(targetSelector);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});