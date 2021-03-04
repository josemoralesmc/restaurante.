const router = require('express').Router();
const validarAdministrador = require('../middlewares/validarAdministrador');
const Pedido = require('../models/Pedidos');

router.route('/')
    .get(validarAdministrador, async (req, res) => {
        let pedidos = await Pedido.obtenerTodos();

        pedidos = await Promise.all(
            pedidos.map(async pedido => {
                const detalles = await Pedido.obtenerDetalle(pedido.id)
                pedido.detalles = detalles;
                return pedido;
            })
        );

        res.json(pedidos);
    })
    .post(async (req, res) => {
        try {
            const { id_usuario, forma_pago, total, productos } = req.body;
        const result = await Pedido.crear(forma_pago, 'Nuevo', total, id_usuario)
            console.log(result);
       await productos.forEach(producto => {
           Pedido.relacionarProducto(result[0], producto.id, producto.precio, producto.cantidad)
      });
        res.json('ok')
        } catch (error) {
            console.log(error);
        }

    }).delete(validarAdministrador, async (req, res) => {
        const id_pedido = req.query.id;

        await Pedido.borrar(id_pedido);

        res.json('Pedido eliminado con id ' + id_pedido);
    });
;

router.route('/:id')
    .get(async (req, res) => {
        const idPedido = req.params.id;
        
        let pedidos = await Pedido.obtenerPorId(idPedido);
        pedidos = await Promise.all(
            pedidos.map(async pedido => {
                const detalles = await Pedido.obtenerDetalle(pedido.id)
                pedido.detalles = detalles;
                return pedido;
            })
        );

        res.json(pedidos);
    })
    .put((req, res) => {
        const idPedido = req.params.id;
        const { estadoNuevo } = req.body;
        //Actualiza estado del pedido por id
        Pedido.actualizarEstado(idPedido, estadoNuevo);
        res.json('El pedido ' + idPedido + ' se cambio al estado ' + estadoNuevo);
    });

module.exports = router;