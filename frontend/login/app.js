document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("form").addEventListener("submit", async (e) => {
        e.preventDefault()
    
        const id = e.target.id.value;
        const senhaDigitada = e.target.senha.value;
    
        // Fetch to the login endpoint
        const res = await fetch("", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ id, senhaDigitada })
        })
        const data = await res.json();
        localStorage.setItem("token", data.userToken)
        window.location.href = "../"
    })
})
