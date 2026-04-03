import { loginApi } from "./api.js";

// --- 1. SÉLECTION DES ÉLÉMENTS DU DOM ---
const loginButton = document.getElementById("login");
const logoutButton = document.getElementById("logout");
const editBanner = document.querySelector(".edit-mode-banner");
const editButton = document.querySelector(".edit-btn");
const filters = document.querySelector(".filters");

// --- 2. GESTION DE L'INTERFACE UTILISATEUR ---

/**
 * Alterne l'affichage entre le mode édition et le mode classique.
 */
function handleBannerDisplay(shouldDisplay) {
    if (shouldDisplay) {
        editBanner.style.display = "flex";
        editButton.style.display = "inline-block";
        filters.style.display = "none";
    } else {
        editBanner.style.display = "none";
        editButton.style.display = "none";
        filters.style.display = "flex";
    }
}

// --- 3. PROCESSUS DE CONNEXION / DÉCONNEXION ---

/**
 * Déconnecte l'utilisateur en supprimant le token.
 */
function logout() {
    console.log("Logout !");
    localStorage.removeItem("token"); // Nettoyage de la session

    // Réinitialisation de la navigation
    loginButton.setAttribute("class", "display");
    logoutButton.setAttribute("class", "hide");
    handleBannerDisplay(false);
}

/**
 * Vérifie si l'utilisateur est connecté et adapte l'UI en conséquence.
 */
export function authenticationCheck() {
    const isLogged = localStorage.getItem("token");

    // Cas 1 : Utilisateur non connecté
    if (!isLogged) {
        loginButton.setAttribute("class", "display");
        logoutButton.setAttribute("class", "hide");
        handleBannerDisplay(false);
        return;
    }

    // Cas 2 : Utilisateur connecté 
    loginButton.setAttribute("class", "hide");
    logoutButton.setAttribute("class", "display");
    handleBannerDisplay(true);

    // Écouteur pour la déconnexion
    logoutButton.addEventListener("click", (e) => {
        e.preventDefault();
        logout();
    });
}

/**
 * Traite l'envoi du formulaire de connexion vers l'API.
 */
async function handleSubmit() {
    const errorMsg = document.querySelector(".error");
    if (errorMsg) errorMsg.innerText = ""; // Réinitialisation de l'erreur

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await loginApi(email, password);

    // Succès de la connexion
    if (response.token) {
        localStorage.setItem("token", response.token);
        window.location.href = "index.html"; // Redirection
    } else {
        // Échec : affichage du message d'erreur
        errorMsg.innerText = response.message;
    }
}

// --- 4. INITIALISATION DES ÉCOUTEURS ---

/**
 * Initialise l'écouteur sur le formulaire de login.
 */
async function login() {
    const form = document.querySelector(".login-form");
    if (!form) return; 

    form.addEventListener("submit", async function (e) {
        e.preventDefault();
        await handleSubmit();
    });
}

// Lancement automatique du script de login
login();