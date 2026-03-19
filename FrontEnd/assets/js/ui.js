/**
 * --- GÉNÉRATION DU HTML ---
 */
function getWorkElement(work) {
  return `<figure>
        <img src="${work.imageUrl}" alt="${work.title}">
        <figcaption>${work.title}</figcaption>
    </figure>`
}


/** --- GESTION VISUELLE DES BOUTONS --- */

function setActiveButton(activeButton) {
  const buttons = document.querySelectorAll(".filter-btn")

  // Retire la classe active de tous les boutons
  buttons.forEach(btn => btn.classList.remove("active"))

  // L'ajoute uniquement au bouton cliqué
  activeButton.classList.add("active")
}

/**
 * --- LOGIQUE DES FILTRES ---
 * Crée un bouton de filtre et définit son comportement au clic.
 */

function handleFilterButton(container, category, works) {
  const button = document.createElement("button")
  button.textContent = category.name
  button.classList.add("filter-btn")

  // Par défaut, le bouton "Tous" est actif à l'initialisation
  if (category.id === "all") {
    button.classList.add("active")
  }

  // Événement au clic pour filtrer la galerie
  button.addEventListener("click", () => {
    setActiveButton(button)

    if (category.id === "all") {
      // Affiche la totalité des travaux
      displayWorks(works)
    } else {
      // Filtre les travaux selon l'ID de la catégorie
      const filteredWorks = works.filter(
        work => work.category.id === category.id
      )
      displayWorks(filteredWorks)
    }
  })

  container.appendChild(button)
}

/**
 * --- AFFICHAGE DE LA GALERIE ---
 * Vide le conteneur actuel et affiche la liste des travaux fournis.
 */

export function displayWorks(works) {
  const gallery = document.querySelector(".gallery")
  gallery.innerHTML = "" // Nettoyage de la galerie avant affichage

  works.forEach((work) => {
    const workElement = getWorkElement(work)
    gallery.innerHTML += workElement
  })
}



/**
 * --- INITIALISATION DES FILTRES ---
 * Ajoute l'option "Tous" et génère les boutons de catégories dans le DOM.
 */

export function displayFilters(categories, works) {
  const filtersContainer = document.querySelector(".filters")

  // Ajout manuel de la catégorie globale au début du tableau
  categories.unshift({ id: "all", name: "Tous" })

  // Création d'un bouton pour chaque catégorie
  categories.forEach(category => {
    handleFilterButton(filtersContainer, category, works)
  })
}
