var express= require('express');
var motorRender = require('express-handlebars');
var app= express();



// configurar la carpeta public como "pública"
app.use(express.static('public'));


app.engine('handlebars', motorRender());
app.set('view engine', 'handlebars');


var productos= [];

productos.push({

    nombre: 'gato',
    precio: '10000',
    imagen: 'ggggg',
    descripcion: 'sdhjsncjks',
});


//configurar ruta inicial

app.get('/', function(req, res){
res.sendFile(__dirname + '/public/index.html');
});


// iniciar el servidor en el puerto 3000
app.listen(3000, function() {
    console.log('Aplicación ejemplo, escuchando el puerto 3000!');
  });