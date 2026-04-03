
import { deleteWorkApi } from "./api.js";
import { displayWorks } from "./ui.js"; 

// --- 1. SÉLECTION DES ÉLÉMENTS DU DOM & VARIABLES ---
let modal = null;

const btnAddPhoto = document.querySelector('.add-photo-btn');
const btnBack = document.querySelector('.js-back-to-gallery');
const viewGallery = document.getElementById('view-gallery');
const viewAddPhoto = document.getElementById('view-add-photo');

// --- 2. GESTION DE LA GALERIE DANS LA MODALE ---

/**
 * Injecte les projets existants dans la galerie de la modale.
 */
function displayModalWorks(works) {
    const modalGallery = document.querySelector(".modal-gallery");
    if (!modalGallery) return;

    modalGallery.innerHTML = ""; 

    works.forEach(work => {
        modalGallery.innerHTML += `
            <figure class="modal-figure">
                <img src="${work.imageUrl}" alt="${work.title}">
                <i class="fa-solid fa-trash-can delete-icon" onclick="deleteWork(${work.id})"></i>
            </figure>
        `;
    });
}

// --- 3. OUVERTURE ET FERMETURE DE LA MODALE ---

/**
 * Ouvre la modale et initialise son contenu.
 */
export function openModal(works) {
    modal = document.getElementById("modal1");
    modal.style.display = "block";
    
    document.querySelector('.js-modal-close').addEventListener('click', function () {
        closeModal();
    });
    
    displayModalWorks(works);
}

/**
 * Ferme la modale et réinitialise les vues.
 */
function closeModal() {
    console.log("===> closeModal", modal);
    if (modal === null) return;
    
    modal.style.display = "none";
    modal = null;

    // Remise à zéro pour la vue galerie lors de la prochaine ouverture
    if (viewAddPhoto && viewGallery) {
        viewAddPhoto.style.display = 'none';
        viewGallery.style.display = 'block';
    }
}

// --- 4. NAVIGATION ET CLICS EXTÉRIEURS ---

// Switch vers le formulaire d'ajout
btnAddPhoto.addEventListener('click', () => {
    viewGallery.style.display = 'none';
    viewAddPhoto.style.display = 'block';
});

// Retour vers la galerie de la modale
btnBack.addEventListener('click', () => {
    viewAddPhoto.style.display = 'none';
    viewGallery.style.display = 'block';
});

// Fermeture au clic à l'extérieur de la modale
window.addEventListener('click', function (e) {
    if (e.target === modal) {
        closeModal();
    }
});

// --- 5. GESTION DE LA SUPPRESSION ---

/**
 * Gère la suppression d'un projet (Modale + Galerie principale).
 * Lié au onclick="deleteWork(id)" défini dynamiquement dans l'HTML.
 */

window.deleteWork = async function(id) {
    const confirmation = confirm("Voulez-vous vraiment supprimer ce projet ?");
    if (!confirmation) return;

    const response = await deleteWorkApi(id);

    if (response.ok) {
        // 1. Suppression visuelle instantanée dans la modale
        const modalFigure = document.querySelector(`.modal-figure [onclick="deleteWork(${id})"]`)?.closest('.modal-figure');
        if (modalFigure) modalFigure.remove();

        // 2. Récupération de la liste à jour
        const responseWorks = await fetch("http://localhost:5678/api/works");
        const updatedWorks = await responseWorks.json();
        
        // 3. Rafraîchissement de la galerie d'accueil
        displayWorks(updatedWorks);
        
        alert("Projet supprimé avec succès !");
    } else {
        alert("Erreur lors de la suppression du projet.");
    }
};