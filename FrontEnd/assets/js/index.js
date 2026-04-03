import { getWorksApi, getCategoriesApi } from "./api.js";
import { displayWorks, displayFilters } from "./ui.js";
import { authenticationCheck } from "./login.js";
import { openModal } from "./modal.js";

async function main() {
  // 1. Gestion de l'UI selon l'état de connexion
  authenticationCheck();

  // 2. Chargement initial des données
  const works = await getWorksApi();
  const categories = await getCategoriesApi();

  // 3. Affichage des éléments à l'écran
  displayWorks(works);
  displayFilters(categories, works);

  // 4. Écouteur pour l'ouverture de la modale
  const modalBtn = document.querySelector(".js-modal");
  modalBtn.addEventListener("click", function (e) {
    e.preventDefault();
    openModal(works);
  });
}

// Lancement de l'application
main();
