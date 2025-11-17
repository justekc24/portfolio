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
            // Si le formulaire est valide, masquer l'erreur
            errorMessage.style.display = 'none';
            errorMessage.textContent = '';

            // Construire un mailto: pour ouvrir le client mail de l'utilisateur
            const to = 'justekocou21@gmail.com';
            const subject = `Formulaire de contact : ${sujet}`;
            const bodyLines = [
                `Prénom: ${prenom}`,
                `Nom: ${nom}`,
                `Sujet: ${sujet}`,
                '',
                `${message}`
            ];
            const body = bodyLines.join('\n');
            const mailto = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

            // Tenter d'ouvrir le client mail dans un nouvel onglet/fenêtre
            const opened = window.open(mailto, '_blank');
            if (!opened) {
                // Fallback : créer un lien temporaire et le cliquer
                const a = document.createElement('a');
                a.href = mailto;
                a.style.display = 'none';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            }

            alert("Votre client mail va s'ouvrir pour envoyer le message. Vérifiez ensuite l'envoi depuis votre application mail.");

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
