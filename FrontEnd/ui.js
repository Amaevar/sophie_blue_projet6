function getWorkElement(work) {
    return `<figure>
        <img src="${work.imageUrl}" alt="${work.title}">
        <figcaption>${work.title}</figcaption>
    </figure>`
}

function setActiveButton(activeButton) {
  const buttons = document.querySelectorAll(".filter-btn")
  buttons.forEach(btn => btn.classList.remove("active"))
  activeButton.classList.add("active")
}


function handleFilterButton(container, category, works) {
    const button = document.createElement("button")
    button.textContent = category.name
    button.classList.add("filter-btn")

    if (category.id === "all") {
      button.classList.add("active")
    }

    button.addEventListener("click", () => {
      setActiveButton(button)

      if (category.id === "all") {
        displayWorks(works)
      } else {
        const filteredWorks = works.filter(
          work => work.category.id === category.id
        )
        displayWorks(filteredWorks)
      }
    })

    container.appendChild(button)
}

export function displayWorks(works) {
  const gallery = document.querySelector(".gallery")
  gallery.innerHTML = ""

  works.forEach((work) => {
    const workElement = getWorkElement(work)
    gallery.innerHTML += workElement
  })
}

export function displayFilters(categories, works) {
    const filtersContainer = document.querySelector(".filters")
    categories.unshift({ id: "all", name: "Tous" })
    categories.forEach(category => {
        handleFilterButton(filtersContainer, category, works)
    })
}