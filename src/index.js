const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

mongoose.connect('mongodb+srv://andrei:1234@cluster0-xpj43.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
app.use(express.json());
app.use(routes);

// Métodos HTTP GET, POST, PUT, DELETE
// Tipos de parâmetros dentro de express
// Query Params: Usado mais em GET; request.query (Filtros, ordenação, paginação,...)
// Route Params: Usado mais em PUT e DELETE; request.params (Identificar um recurso na alteração ou remoção)
// Body: Usado muito em POST em PUT; request.body (Dados para criação ou alteração de algum registro)

// MongoDB (Não-relacional) 



app.listen(3333);