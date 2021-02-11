let email = document.getElementById("email");
let pass = document.getElementById("password");
let btnLogin = document.getElementById("login");
let description = document.getElementById("setting")

console.log("hola mundo");


async function logearse(param) {

    const response = await fetch("/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(param)
    })
    let json = await response.json();
    console.log(json);
    if (!json.error) {
        localStorage.setItem("nombre", json.respuesta.nombre);
        if (json.respuesta.admin) {
            window.localStorage.setItem("perfil", "Administrador");
        } else {
            window.localStorage.setItem("perfil", "Operador");
        }
        console.log("login exitoso!");
        location.assign('/saludo.html');
    } else {
        let message = document.createElement("div");
        message.className = "alert alert-danger";
        message.setAttribute("role", "alert");
        message.innerHTML = json.respuesta;
        description.appendChild(message);
    }
}


btnLogin.addEventListener("click", () => {
    let pack = {
        "email": email.value,
        "contrasena": pass.value
    }
    logearse(pack);

});