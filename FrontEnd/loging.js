const form = document.querySelector(".login-form");
const errorMsg = document.querySelector(".error"); 

form.addEventListener("submit", async function (e) {
    e.preventDefault();

    
    if (errorMsg) errorMsg.innerText = "";

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

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
        });

        if (response.ok) {
            // Cas où ces correct
            const data = await response.json();
            localStorage.setItem("token", data.token);
            window.location.href = "index.html";
        } else {
            // Cas 401 ou 404
            errorMsg.innerText = "Email ou mot de passe incorrect";
        }
    } catch (err) {
        // Cas où le serveur ne répond pas
        errorMsg.innerText = "Impossible de joindre le serveur.";
    } 
});