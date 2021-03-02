const router = require('express').Router();
const validarAdministrador = require('../middlewares/validarAdministrador');
const Producto = require('../models/productos');

router.route('/')
    .get( async (req, res) => {
        const productos = await Producto.obtenerTodos();
        res.json(productos);
    })
    .post( validarAdministrador,async (req, res) => {
        try {
            const { nombre, url_foto, precio } = req.body;
        const result = await Producto.crear(nombre, url_foto, precio)
        res.json('Producto creado')
        } catch (error) {
            console.log(error);
        }    
    })
    .put(validarAdministrador, async (req, res) => {
        const id_producto = req.query.id;
        const { nombre, url_foto, precio } = req.body;

        const result = await Producto.actualizar(id_producto, nombre, url_foto, precio);

        res.json("Producto actualizado con exito");
    })
    .delete(validarAdministrador, async (req, res) => {
        const id_producto = req.query.id;

        await Producto.borrar(id_producto);

        res.json('Producto eliminado con id ' + id_producto);
    });

module.exports = router;