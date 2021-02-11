let nombreSaludo = localStorage.getItem("nombre");
let perfilSaludo = localStorage.getItem("perfil");

let spanNombre = document.getElementById("name");
let spanPerfil = document.getElementById("profile");

spanNombre.innerHTML = nombreSaludo;
spanPerfil.innerHTML = perfilSaludo;

async function name(params) {
    let response = await fetch("/saludo");
    let json = await response.json();
    console.log(json);

}