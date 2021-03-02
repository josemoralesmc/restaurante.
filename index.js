require('dotenv').config();
const express = require('express');
const expressJwt = require('express-jwt');

// Iniciar app con express
const app = express();

// Middleware
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send('invalid token...');
    }
});

app.use(express.json());
app.use(expressJwt({
    secret: process.env.jwt_pass,
    algorithms: ['HS256']
}).unless({
    path: ['/api/login', '/api/registrar']
}));

// Routes
app.use('/api', require('./routes/auth.routes'));
app.use('/api/usuarios', require('./routes/usuarios.routes'));
app.use('/api/productos', require('./routes/productos.routes'));
app.use('/api/pedidos', require('./routes/pedidos.routes'));

app.listen(process.env.PORT, () => { console.log('Servidor escuchando en el puerto ' + process.env.PORT); });