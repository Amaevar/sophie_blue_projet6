import { loginApi } from "./api.js";

// Sélection des éléments de navigation (Login/Logout)
const loginButton = document.getElementById("login")
const logoutButton = document.getElementById("logout")

// --- ACTION DE DÉCONNEXION ---

function logout() {
    console.log("Logout !")

    // Suppression du jeton d'authentification
    localStorage.removeItem("token");

    // Mise à jour de l'affichage des boutons
    loginButton.setAttribute("class", "display")
    logoutButton.setAttribute("class", "hide")
}

// --- VÉRIFICATION DE L'ÉTAT DE CONNEXION ---

export function authenticationCheck() {
    const isLogged = localStorage.getItem("token")
    const filters = document.querySelector(".filters")
    const editBanner = document.querySelector(".edit-mode-banner")
    const editButton = document.querySelector(".edit-btn")        

    // Si l'utilisateur n'est pas connecté

    if (!isLogged) {
        loginButton.setAttribute("class", "display")
        logoutButton.setAttribute("class", "hide")

        //  cache le bandeau noir le bouton modifier et garde les filtre

        if (editBanner) editBanner.style.display = "none"
        if (editButton) editButton.style.display = "none"
        if (filters) filters.style.display = "flex"

        return
    }

    // Si l'utilisateur est connecté 
    loginButton.setAttribute("class", "hide")
    logoutButton.setAttribute("class", "display")

    //  Affichage du bandeau noir du bouton modifier et cache les filtre

    if (editBanner) editBanner.style.display = "flex"
    if (editButton) editButton.style.display = "inline-block"
    if (filters) filters.style.display = "none"

    logoutButton.addEventListener("click", (e) => {
        e.preventDefault()
        logout()
    })
}

// --- TRAITEMENT DE LA SOUMISSION DU FORMULAIRE ---

async function handleSubmit() {
    // Réinitialisation du message d'erreur à chaque tentative
    const errorMsg = document.querySelector(".error");
    if (errorMsg) errorMsg.innerText = "";

    // Récupération des valeurs saisies par l'utilisateur
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Appel à l'API pour tenter la connexion
    const response = await loginApi(email, password);

    // Si un token est reçu, la connexion est réussie
    if (response.token) {
        localStorage.setItem("token", response.token);
        window.location.href = "index.html"; // Redirection vers l'accueil
    } else {
        // Affichage du message d'erreur en cas d'échec
        errorMsg.innerText = response.message;
    }
}

// --- INITIALISATION DES ÉCOUTEURS D'ÉVÉNEMENTS DU FORMULAIRE ---
async function login() {
    const form = document.querySelector(".login-form");

    // Interception de l'envoi du formulaire
    form.addEventListener("submit", async function (e) {
        e.preventDefault()
        await handleSubmit()
    })
}


login()