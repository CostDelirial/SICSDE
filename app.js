// Requires (importacion de librerias de terceos o locales)
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// Inicializar variables
var  app = express();




// Body Parser

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// importar rutas
var appRoutes = require('./routes/app');
var usuarioRoutes = require('./routes/usuario');
var denunciaRoutes = require('./routes/denuncia');
var loginRoutes = require('./routes/login');


// Conexion BD 
mongoose.connection.openUri('mongodb://localhost:27017/sicsdedb',(err, res) =>{
        if( err ) throw err;
        console.log("base de datos: \x1b[32m%s\x1b[0m","online");
});

// Rutas 
app.use('/denuncia', denunciaRoutes );
app.use('/usuario', usuarioRoutes);
app.use('/login',loginRoutes);
app.use('/', appRoutes);

// Escuchar peticiones

app.listen(3000, () => {
 console.log("express server corriedno en el puerto 3000: \x1b[32m%s\x1b[0m","online");
})