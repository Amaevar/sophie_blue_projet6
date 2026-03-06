import { getWorksApi, getCategoriesApi } from "./api.js"
import { displayWorks, displayFilters } from "./ui.js"
import { authenticationCheck } from "./login.js"

async function main() {
  // Vérification de l'état de connexion (affichage du mode édition si nécessaire)
  authenticationCheck()

  // Récupération simultanée des données (travaux et catégories) via l'API
  const works = await getWorksApi()
  const categories = await getCategoriesApi()

  // Initialisation de l'interface : affichage de la galerie et des filtres
  displayWorks(works)
  displayFilters(categories, works)
}

// Lancement de l'application
main()
