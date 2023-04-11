document.getElementById("visibility").addEventListener("click", showPassword);
document.getElementById("submit-button").addEventListener(
    "click", submitPassword, {once: true}
);

function showPassword() {
    const visibility = document.getElementById("visibility");
    const passwordInput = document.getElementById("password-field");
    if (visibility.src.includes("visibility-on")) {
        visibility.src = "./gallery/visibility-off.png";
        passwordInput.type = "text";
        console.log("DEBUG: showPassword() -> Show Password");
    } else if (visibility.src.includes("visibility-off")) {
        visibility.src = "./gallery/visibility-on.png";
        passwordInput.type = "password";
        console.log("DEBUG: showPassword() -> Masking Password");
    } else {
        visibility.src = "./gallery/visibility-on.png";
        passwordInput.type = "password";
        console.log("DEBUG: showPassword() -> Unknown Attribute; Resetting View");
    }
}

async function submitPassword() {
    const passwordValue = document.getElementById("password-field").value;
    const responseDisplay = document.getElementById("response-message");
    const iconDisplay = document.getElementById("response-icon");

    // User did not enter any password
    if (!passwordValue) {
        responseDisplay.textContent = "Password field cannot be empty.";
        responseDisplay.style.color = "red";
        
        iconDisplay.src = "./gallery/error.png";
        document.getElementById("submit-button").addEventListener(
            "click", submitPassword, {once: true}
        );
        console.log("DEBUG: submitPassword() -> Empty Field. Reattaching Event.");
    }
    console.log(`DEBUG: submitPassword() -> User Input = ${passwordValue}`);
    // Deliver Password to backend
    const result = await fetch("http://192.168.0.168:5000/submit", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "password": passwordValue
        })
    }).then(
        (response) => (response.json())
    );

    console.log(result["status"]);
    if (result["status"] === "pass") {
        responseDisplay.textContent = "Successfully Login to APU Wi-Fi.";
        responseDisplay.style.color = "green";
        iconDisplay.src = "./gallery/tick.png";
    } else if (result["status"] === "fail") {
        responseDisplay.textContent = "Invalid Password. Please try again.";
        responseDisplay.style.color = "red";
        iconDisplay.src = "./gallery/error.png";
        document.getElementById("submit-button").addEventListener(
            "click", submitPassword, {once: true}
        );
    };
}
