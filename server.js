require("dotenv").config();
const express = require('express')
const server = express();
const port = 5500;
server.use(express.json());
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const helmet = require("helmet");

const mongoose = require("./conexion");

const Peliculas = mongoose.model('Peliculas', {
    nombre: String,
    genero: String,
    duracion: String,
});

const Usuarios = mongoose.model('Usuarios', {
    nombre: String,
    apellido: String,
    email: String,
    contrasena: String,
    admin: Boolean,
    regular: Boolean,
    city: String
})

server.use(express.static("public"));

const claveMaestra = "i&fMxeyKq$7o1XB7w&yd!DJ^wVA%Mu%0NAQylD6dJ^";


server.listen(port, () => console.log(`Example app listening on port ${port}!`))

let usuarios = [{
        nombre: "Andres",
        apellido: "Mesa",
        email: "andres@nada.com",
        contrasena: "1234",
        admin: true,
        regular: false,
        city: "Medellin"
    },
    {
        nombre: "Juan",
        apellido: "Fernandez",
        email: "juan@nada.com",
        contrasena: "12345",
        admin: false,
        regular: true,
        city: "Medellin"
    }
];

// server.use(expressJwt({ secret: claveMaestra, algorithms: ['HS256'] }).unless({ path: ['/login', '/peliculas',] }));

server.use(function errorHandler(error, req, res, next) {
    if (error.name === 'UnauthorizedError') {
        res.status(401).send("Invalid token");
    }
    res.status(500).json("Internal server error");
    console.log(error);
})

server.post("/login", async(req, res) => {
    console.log(req.body);
    // let objetivo = usuarios.find(e => e.contrasena == req.body.contrasena);
    let objetivo = await Usuarios.findOne({ contrasena: req.body.contrasena })

    if (objetivo) {

        let respuesta = {
            error: false,
            status: 200,
            descripcion: "OK",
            respuesta: objetivo
        }
        res.json(respuesta);
    } else {
        let respuesta = {
            error: true,
            status: 401,
            descripcion: "Parametros invalidos",
            respuesta: "Usuario y/o contraseña incorrectos"
        }
        res.json(respuesta);
    }
});

server.post("/registrar", (req, res) => {

    const usuarioNuevo = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        contrasena: req.body.contrasena,
        admin: req.body.admin,
        regular: req.body.regular,
        city: req.body.city
    }
    const rsUsuario = new Usuarios(usuarioNuevo);
    rsUsuario.save();
    res.json(rsUsuario);
})

server.post("/peliculas", (req, res) => {
    const peliculaNueva = {
        nombre: req.body.nombre,
        genero: req.body.genero,
        duracion: req.body.duracion
    }
    const rsPelicula = new Peliculas(peliculaNueva);
    rsPelicula.save();
    res.json(rsPelicula);
})

server.get('/peliculas', async(req, res) => {
    const listaPelis = await Peliculas.find();
    res.json(listaPelis);
})

server.get("/saludo", (req, res) => {
    // let token = jwt.sign({ usuario: "objetivo" }, claveMaestra);
    expressJwt({ secret: claveMaestra }),
        res.json("Petición logró ingresar");
    console.log(token);
});