export async function getWorksApi() {
    const response = await fetch("http://localhost:5678/api/works");
    return response.json();
}

export async function getCategoriesApi() {
  const response = await fetch("http://localhost:5678/api/categories")
  return response.json()
}

export async function loginApi(email, password) {
    try {
        const response = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })

        if (!response.ok) {
            return {
                message: "Email ou mot de passe incorrect"
            };
        }
        return response.json()
    } catch (error) {
        console.log(error);
        return {
            message: "Impossible de joindre le serveur."
        };
    }
}