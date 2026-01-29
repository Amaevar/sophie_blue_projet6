export async function getWorksApi() {
    const response = await fetch("http://localhost:5678/api/works");
    return response.json();
}

export async function getCategoriesApi() {
  const response = await fetch("http://localhost:5678/api/categories")
  return response.json()
}
