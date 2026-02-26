import { getWorksApi, getCategoriesApi } from "./api.js"
import { displayWorks, displayFilters } from "./ui.js"
import { authenticationCheck } from "./login.js"


async function main() {
  authenticationCheck()

  const works = await getWorksApi()
  const categories = await getCategoriesApi()

  displayWorks(works)
  displayFilters(categories, works)
}

main()

