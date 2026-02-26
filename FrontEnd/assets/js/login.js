import { loginApi } from "./api.js";

// --- deconexion ---
const loginLink = document.querySelector("#logout");
const token = localStorage.getItem("token");

if (token) {
    // 2. Si on est connecté, on change le texte
    loginLink.innerText = "logout";

    // 3. On ajoute l'action de déconnexion au clic
    loginLink.addEventListener("click", (e) => {
        e.preventDefault();

        // --- L'ACTION DE DÉCONNEXION ---
        localStorage.removeItem("token"); // On supprime le token


        window.location.reload();
    });
}

function logout() {
    console.log("Logout !")
}

export function authenticationCheck() {
    const isLogged = localStorage.getItem("token")
    const loginButton = document.getElementById("login")
    const logoutButton = document.getElementById("logout")
    if (!isLogged) {
        loginButton.setAttribute("class", "display")
        logoutButton.setAttribute("class", "hide")
        return
    }

    loginButton.setAttribute("class", "hide")
    logoutButton.setAttribute("class", "display")
    logoutButton.addEventListener("click", (e) => {
        e.preventDefault()
        logout()
    })
}




async function handleSubmit() {
    const errorMsg = document.querySelector(".error");
    if (errorMsg) errorMsg.innerText = "";

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // APPEL À L'API (REQUÊTE RÉSEAU)
    const response = await loginApi(email, password);

    // TRAITEMENT DE LA RÉPONSE
    if (response.token) {
        localStorage.setItem("token", response.token);
        window.location.href = "index.html";
    } else {
        // Gestion de l'erreur
        errorMsg.innerText = response.message;
    }
}

async function login() {
    const form = document.querySelector(".login-form");
    form.addEventListener("submit", async function (e) {
        e.preventDefault()
        await handleSubmit()
    })
}
login()
