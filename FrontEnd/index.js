

import { getWorksApi, getCategoriesApi } from "./api.js"

/*GALERIE*/

function getWorkElement(work) {
  return `<figure>
    <img src="${work.imageUrl}" alt="${work.title}">
    <figcaption>${work.title}</figcaption>
  </figure>`
}

function displayWorks(works) {
  const gallery = document.querySelector(".gallery")
  gallery.innerHTML = ""

  works.forEach((work) => {
    const workElement = getWorkElement(work)
    gallery.innerHTML += workElement
  })
}

/* filtres */

function displayFilters(categories, works) {
  const filtersContainer = document.querySelector(".filters")

  const allBtn = document.createElement("button")
  allBtn.textContent = "Tous"
  allBtn.classList.add("filter-btn", "active")
  filtersContainer.appendChild(allBtn)

  allBtn.addEventListener("click", () => {
    setActiveButton(allBtn)
    displayWorks(works)
  })

  categories.forEach(category => {
    const button = document.createElement("button")
    button.textContent = category.name
    button.classList.add("filter-btn")

    button.addEventListener("click", () => {
      setActiveButton(button)

      const filteredWorks = works.filter(
        work => work.category.id === category.id
      )
      displayWorks(filteredWorks)
    })

    filtersContainer.appendChild(button)
  })
}

function setActiveButton(activeButton) {
  const buttons = document.querySelectorAll(".filter-btn")
  buttons.forEach(btn => btn.classList.remove("active"))
  activeButton.classList.add("active")
}

/*main*/

async function main() {
  const works = await getWorksApi()
  const categories = await getCategoriesApi()

  displayWorks(works)
  displayFilters(categories, works)
}

main()