import { getWorksApi, getCategoriesApi } from "../api.js"
import { displayWorks, displayFilters } from "../ui.js"


async function main() {
  const works = await getWorksApi()
  const categories = await getCategoriesApi()

  displayWorks(works)
  displayFilters(categories, works)
}

main()

