let modal = null

function displayModalWorks(works) {
    const modalGallery = document.querySelector(".modal-gallery");
    if (!modalGallery) return;

    modalGallery.innerHTML = ""; // On vide avant d'ajouter

    works.forEach(work => {
        modalGallery.innerHTML += `
            <figure class="modal-figure">
                <img src="${work.imageUrl}" alt="${work.title}">
                <i class="fa-solid fa-trash-can delete-icon" onclick="deleteWork(${work.id})"></i>
            </figure>
        `;
    });
}

export function openModal(works) {
    modal = document.getElementById("modal1");
    modal.style.display = "block"
    document.querySelector('.js-modal-close').addEventListener('click', function () {
        closeModal()
    })
    displayModalWorks(works)
}

function closeModal() {
    console.log("===> closeModal", modal)
    if (modal === null) {
        return
    }
    modal.style.display = "none"
    modal = null
}

// Sélection des éléments
const btnAddPhoto = document.querySelector('.add-photo-btn');
const btnBack = document.querySelector('.js-back-to-gallery');
const viewGallery = document.getElementById('view-gallery');
const viewAddPhoto = document.getElementById('view-add-photo');

// Passage à la vue "Ajout photo"
btnAddPhoto.addEventListener('click', () => {
    viewGallery.style.display = 'none';
    viewAddPhoto.style.display = 'block';
});

// Retour à la vue "Galerie"
btnBack.addEventListener('click', () => {
    viewAddPhoto.style.display = 'none';
    viewGallery.style.display = 'block';
});