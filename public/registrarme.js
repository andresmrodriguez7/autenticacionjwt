let nombre = document.getElementById("nombre");
let apellido = document.getElementById("apellido");
let email = document.getElementById("email");
let perfil = document.getElementById("perfil");
let ciudad = document.getElementById("ciudad");
let contrasena = document.getElementById("contrasena");
let btnRegistrar = document.getElementById("btnRegister")
let admin = null;
let regular = null;

async function crearUsuario(params) {
    const response = await fetch("/registrar", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    })
    let json = await response.json();
    console.log(json);
    alert("Usuario creado con exito!");
    location.assign('/index.html');

}

btnRegistrar.addEventListener("click", () => {

    if (perfil.value === "Administrador") {
        admin = true;
        regular = false;
    } else {
        regular = true;
        admin = false;
    }
    let nuevoUsuario = {
        "nombre": nombre.value,
        "apellido": apellido.value,
        "email": email.value,
        "contrasena": contrasena.value,
        "admin": admin,
        "regular": regular,
        "city": ciudad.value,
    }

    crearUsuario(nuevoUsuario);


})