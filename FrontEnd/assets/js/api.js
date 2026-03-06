export async function getWorksApi() {
    // Récupération des projets via l'API
    const response = await fetch("http://localhost:5678/api/works");
    
    // Conversion de la réponse en JSON
    return response.json();
}

export async function getCategoriesApi() {
  // Récupération de la liste des catégories via l'API
  const response = await fetch("http://localhost:5678/api/categories")
  
  // Conversion de la réponse en JSON
  return response.json()
}

export async function loginApi(email, password) {
    try {
        // Envoi de la requête de connexion avec les identifiants
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

        // Vérification si la réponse est valide, sinon retour d'un message d'erreur
        if (!response.ok) {
            return {
                message: "Email ou mot de passe incorrect"
            };
        }
        
        // Retour des données utilisateur (token, id, etc.)
        return response.json()
    } catch (error) {
        // Gestion des erreurs réseau ou serveur
        console.log(error);
        return {
            message: "Impossible de joindre le serveur."
        };
    }
}