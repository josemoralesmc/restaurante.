const Sequelize = require('sequelize');
const path = process.env.conexion_bd;
const sequelize = new Sequelize(path);

sequelize.authenticate().then(() => {
    console.log('Conectado a la BD');
}).catch(err => {
    console.log('Error de conexion a la BD: ', err);
}).finally(() => {
    //sequelize.close();
})

module.exports = sequelize;