// ==========================================================
// AWS Secure Inventory Portal
// Secrets Manager
// ==========================================================

document.addEventListener("DOMContentLoaded", () => {

    console.log("Secrets Manager page loaded.");

    configureButtons();

    loadSecrets();

});

// ==========================================================
// Configure Buttons
// ==========================================================

function configureButtons() {

    document
        .getElementById("createSecretButton")
        .addEventListener("click", createSecret);

    document
        .getElementById("searchSecretButton")
        .addEventListener("click", searchSecret);

    document
        .getElementById("updateSecretButton")
        .addEventListener("click", updateSecret);

    document
        .getElementById("deleteSecretButton")
        .addEventListener("click", deleteSecret);

    document
        .getElementById("listSecretsButton")
        .addEventListener("click", loadSecrets);

}

// ==========================================================
// Load Secrets
// ==========================================================

async function loadSecrets() {

    try {

        const response = await fetch("/secrets");

        const result = await response.json();

        const list = document.getElementById("secretList");

        list.innerHTML = "";

        if (!result.data || result.data.length === 0) {

            const item = document.createElement("li");
            item.textContent = "No secrets found.";

            list.appendChild(item);

            return;

        }

        result.data.forEach(secret => {

            const item = document.createElement("li");

            item.textContent = secret.Name;

            list.appendChild(item);

        });

    }

    catch (error) {

        console.error(error);

        alert("Unable to load secrets.");

    }

}

// ==========================================================
// Create Secret
// ==========================================================

async function createSecret() {

    try {

        const name = document.getElementById("createName").value;

        const username = document.getElementById("createUsername").value;

        const password = document.getElementById("createPassword").value;

        const response = await fetch("/secrets", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                name,

                value: {

                    username,

                    password

                }

            })

        });

        const result = await response.json();

        alert(result.message || "Secret created successfully.");

        loadSecrets();

    }

    catch (error) {

        console.error(error);

        alert("Unable to create secret.");

    }

}

// ==========================================================
// Search Secret
// ==========================================================

async function searchSecret() {

    try {

        const name = document.getElementById("searchName").value;

        const response = await fetch(

            `/secrets/secret?name=${encodeURIComponent(name)}`

        );

        const result = await response.json();

        document.getElementById("searchResult").textContent =

            JSON.stringify(result.data, null, 4);

    }

    catch (error) {

        console.error(error);

        alert("Secret not found.");

    }

}

// ==========================================================
// Update Secret
// ==========================================================

async function updateSecret() {

    try {

        const name = document.getElementById("updateName").value;

        const username = document.getElementById("updateUsername").value;

        const password = document.getElementById("updatePassword").value;

        const response = await fetch(

            `/secrets/secret?name=${encodeURIComponent(name)}`,

            {

                method: "PUT",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify({

                    username,

                    password

                })

            }

        );

        const result = await response.json();

        alert(result.message || "Secret updated.");

        loadSecrets();

    }

    catch (error) {

        console.error(error);

        alert("Unable to update secret.");

    }

}

// ==========================================================
// Delete Secret
// ==========================================================

async function deleteSecret() {

    try {

        const name = document.getElementById("deleteName").value;

        const confirmDelete = confirm(

            `Do you really want to delete "${name}"?`

        );

        if (!confirmDelete) {

            return;

        }

        const response = await fetch(

            `/secrets/secret?name=${encodeURIComponent(name)}`,

            {

                method: "DELETE"

            }

        );

        const result = await response.json();

        alert(result.message || "Secret deleted.");

        loadSecrets();

    }

    catch (error) {

        console.error(error);

        alert("Unable to delete secret.");

    }

}