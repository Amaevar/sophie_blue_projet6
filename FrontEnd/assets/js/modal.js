let modal = null

function displayModalWorks(works) {
    console.log("===> displayModalWorks", works)
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
