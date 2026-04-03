// --- 1. GÉNÉRATION DU HTML ---

/**
 * Génère le squelette HTML d'un projet pour la galerie principale.
 */
function getWorkElement(work) {
    return `<figure>
        <img src="${work.imageUrl}" alt="${work.title}">
        <figcaption>${work.title}</figcaption>
    </figure>`;
}

// --- 2. GESTION DES FILTRES ---

/**
 * Gère l'état visuel actif/inactif des boutons de filtre.
 */

function setActiveButton(activeButton) {
    const buttons = document.querySelectorAll(".filter-btn");
    buttons.forEach(btn => btn.classList.remove("active"));
    activeButton.classList.add("active");
}

/**
 * Crée un bouton de filtre et gère son comportement au clic.
 */
function handleFilterButton(container, category, works) {
    const button = document.createElement("button");
    button.textContent = category.name;
    button.classList.add("filter-btn");

    // Par défaut, le bouton "Tous" est actif
    if (category.id === "all") {
        button.classList.add("active");
    }

    button.addEventListener("click", () => {
        setActiveButton(button);

        if (category.id === "all") {
            displayWorks(works);
        } else {
            const filteredWorks = works.filter(work => work.category.id === category.id);
            displayWorks(filteredWorks);
        }
    });

    container.appendChild(button);
}

// --- 3. FONCTIONS EXPORTÉES (AFFICHAGE) ---

/**
 * Vide et rafraîchit la galerie d'images principale.
 */
export function displayWorks(works) {
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = ""; // Nettoyage du contenu précédent

    works.forEach((work) => {
        const workElement = getWorkElement(work);
        gallery.innerHTML += workElement;
    });
}

/**
 * Initialise l'affichage des filtres par catégorie.
 */
export function displayFilters(categories, works) {
    const filtersContainer = document.querySelector(".filters");

    // Ajout manuel de la catégorie "Tous" au début
    categories.unshift({ id: "all", name: "Tous" });

    // Création des boutons pour chaque catégorie
    categories.forEach(category => {
        handleFilterButton(filtersContainer, category, works);
    });
}
