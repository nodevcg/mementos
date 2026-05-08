const token = localStorage.getItem("token");

async function validarToken() {
    const res = await fetch("/validar", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })
    .catch(error => console.error("Erro:", error))

    const data = res.json();

    return data.acessoAutorizado
}

if (token) {
    const acessoAutorizado = validarToken();
    if (!acessoAutorizado) window.location.href = "./login"
} else {
    window.location.href = "./login"
}