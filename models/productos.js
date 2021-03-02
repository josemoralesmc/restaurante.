const sequelize = require('./../conexion');

const Producto = {};

Producto.crear = async (nombre, url_foto, precio) => {
    try {
        const result = await sequelize.query('INSERT INTO producto(nombre, url_foto, precio) VALUES (?, ?, ?)', {
            replacements: [nombre, url_foto, precio]
        });
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
    }
};

Producto.obtenerTodos = async () => {
    const result = await sequelize.query('SELECT id, nombre, url_foto, precio FROM producto',
        { type: sequelize.QueryTypes.SELECT });
    return result;
}

Producto.actualizar = async (id_producto, nombre, url_foto, precio) => {
    try {
        const result = await sequelize.query('UPDATE producto SET nombre = ?, url_foto = ?, precio = ? WHERE id = ?', {
            replacements: [nombre, url_foto, precio, id_producto]
        });
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
    }
}

Producto.borrar = async (id) => {
    const result = await sequelize.query('DELETE FROM producto WHERE id = ?', {
        replacements: [id]
    });
    return result;
}

module.exports = Producto;