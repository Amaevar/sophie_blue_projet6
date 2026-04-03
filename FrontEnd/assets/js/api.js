
/**
 * Récupère la liste complète des projets.
 */
export async function getWorksApi() {
    const response = await fetch("http://localhost:5678/api/works");
    return response.json();
}

/**
 * Récupère la liste des catégories de projets.
 */
export async function getCategoriesApi() {
    const response = await fetch("http://localhost:5678/api/categories");
    return response.json();
}

/**
 * Envoie les identifiants pour connecter l'utilisateur.
 */
export async function loginApi(email, password) {
    try {
        const response = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: email, password: password })
        });

        // Si l'identifiant ou le mot de passe est faux
        if (!response.ok) {
            return { message: "Email ou mot de passe incorrect" };
        }
        
        return response.json();
    } catch (error) {
        console.log(error);
        return { message: "Impossible de joindre le serveur." };
    }
}

/**
 * Supprime un projet ciblé par son ID (nécessite d'être connecté).
 */
export async function deleteWorkApi(id) {
    const token = localStorage.getItem("token");
    
    const response = await fetch(`http://localhost:5678/api/works/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    return response;
}