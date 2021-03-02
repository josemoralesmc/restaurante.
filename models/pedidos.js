const sequelize = require('./../conexion');

const Pedido = {};

Pedido.crear = async (forma_pago, estado_pedido, total, usuario_id) => {
    try {
        const result = await sequelize.query('INSERT INTO pedidos(forma_pago, estado_pedido, total, usuario_id) VALUES (?, ?, ?, ?)', {
            replacements: [forma_pago, estado_pedido, total, usuario_id]
        });
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
    }
};

Pedido.relacionarProducto = async (pedido_id, producto_id, precio, cantidad) => {
    try {
        const result = await sequelize.query('INSERT INTO pedido_producto(pedido_id, producto_id, precio, cantidad) VALUES (?, ?, ?, ?)', {
            replacements: [pedido_id, producto_id, precio, cantidad]
        });
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
    }
}

Pedido.obtenerTodos = async () => {
    try {
       const result = await sequelize.query('SELECT pedidos.estado_pedido, pedidos.id, pedidos.total, pedidos.forma_pago, usuario.nombre_apellido, usuario.direccion_envio FROM pedidos JOIN usuario ON usuario.id = pedidos.usuario_id',
        { type: sequelize.QueryTypes.SELECT });
    return result; 
    } catch (error) {
        console.log(error);
    }
    
}

Pedido.obtenerPorId = async (id) => {
    const result = await sequelize.query('SELECT pedidos.estado_pedido, pedidos.id, pedidos.total, pedidos.forma_pago, usuario.nombre_apellido, usuario.direccion_envio FROM pedidos JOIN usuario ON usuario.id = pedidos.usuario_id WHERE pedidos.id = ?',
        {
            replacements: [id],
            type: sequelize.QueryTypes.SELECT
        });
    return result;
}

Pedido.obtenerDetalle = async (id_pedido) => {
    const result = await sequelize.query('SELECT producto.nombre, producto.url_foto, producto.precio, pedido_producto.cantidad FROM pedido_producto JOIN producto ON producto.id = pedido_producto.producto_id WHERE pedido_producto.pedido_id = ?',
        {
            replacements: [id_pedido],
            type: sequelize.QueryTypes.SELECT
        });
    return result;
}

Pedido.actualizarEstado = async (id_pedido, estado_pedido) => {
    try {
        const result = await sequelize.query('UPDATE pedidos SET estado_pedido = ? WHERE id = ?', {
            replacements: [estado_pedido, id_pedido]
        });
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
    }
}

module.exports = Pedido;