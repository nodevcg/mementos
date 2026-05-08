document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("form").addEventListener("submit", async (e) => {
        e.preventDefault()
    
        const id = e.target.id.value;
        const senha = e.target.senha.value;
    
        // Fetch to the register (cadastro) endpoint
        const res = await fetch("", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ id, senha })
        })
        const data = await res.json();
    })
})

