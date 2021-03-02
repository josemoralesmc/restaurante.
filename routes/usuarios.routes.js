const router = require('express').Router();
const validarAdmin = require('../middlewares/validarAdministrador');
const Usuario = require('../models/Usuario');
const ValidarUsuario = require('../middlewares/Usuariosvalidar')

router.route('/')
    .get(validarAdmin, async (req, res) => {
        const usuarios = await Usuario.obtenerTodos();
        res.json(usuarios);
    })
    .put(validarAdmin, ValidarUsuario, async (req, res) => {
        const id_usuario = req.query.id;
        const { nombre_usuario, nombre_apellido, email, direccion_envio, telefono } = req.body;

        const result = await Usuario.actualizar(id_usuario, nombre_usuario, nombre_apellido, email, direccion_envio, telefono);

        res.json(result);
    })
    .delete(validarAdmin, async (req, res) => {
        const id_usuario = req.query.id;

        await Usuario.borrar(id_usuario);

        res.json('Usuario eliminado con id ' + id_usuario);
    });

module.exports = router;