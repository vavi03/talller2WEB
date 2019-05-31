const MongoClient = require('mongodb').MongoClient,
    ObjectID = require('mongodb').ObjectID,
    engines = require('consolidate');


var express = require('express');
var motorRender = require('express-handlebars');
var assert = require('assert');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Conectarse a Base de Datos
MongoClient.connect('mongodb+srv://cluster0-vr7bh.mongodb.net/shaft?retryWrites=true', {

    auth: {
        user: 'vavi03',
        password: 'soussye03_'
    },
    useNewUrlParser: true

}, function (err, client) {
    if (err) throw err;

    db = client.db('shaft');

    // Iniciar servidor
    console.log("escuchando en el puerto 3000!");
    app.listen(process.env.PORT || 3000);
});


// configurar la carpeta public como "pública"
app.use(express.static('public'));


app.engine('handlebars', motorRender());
app.set('view engine', 'handlebars');



//configurar ruta inicial

app.get('/', function (req, res) {
    var contexto = {

        layout:false
    };
   res.render('home', contexto);
  //  res.send('home', contexto);
});

app.get('/tienda/:categoria?', function(req, res){
 var query={};
 var options = {};

 if(req.params.categoria){
    query.categoria = req.params.categoria;
 }

 
 if(req.query.serie){
     query.serie = req.query.serie;
 }

 if(req.query.alfab == 1){
    options.sort = 'nombre';
}

if(req.query.precio){
    query.precio = { $lte : parseInt(req.query.precio)};
}

if(req.query.color){
    query.color = req.query.color;
}
 
 var productos= db.collection('productos');
 productos.find(query, options).toArray((err,resultList)=>{
    contexto={
        lista:resultList,
        precio: req.query.precio,
        layout:false
    };
    res.render('tienda', contexto);
 });
});

app.get('/producto/:id', function(req,res){

    var contexto=null;
    var query= {};


    var esShirt = false;

    if(req.params.id){
        query.id= parseInt(req.params.id);
        
    }

    var productos = db.collection('productos').find(query).toArray((err, resultList) => {
       
        contexto ={
            layout:false,
        producto :resultList[0],
          
        esShirt: resultList[0].categoria == 'shirt',
        }
        res.render('producto', contexto);
    });

});

app.get('/carro', function(req,res){

    var mensaje = false;

    if(req.query.sent){
        mensaje = true;
    }

    var contexto={
        mensaje,
        layout:false
    };

   res.render('carrito', contexto);
  

});

app.post('/pedido', function(req,res){

    //escribir en db
    
    var pedido = {
        correo: req.body.correo,
        nombre: req.body.name,
        fecha: new Date(),
        dir: req.body.dir,
        ciudad: req.body.ciudad,
        pais: req.body.pais,
        total: req.body.total

        
    };
    
    var collection = db.collection('pedidos');
    collection.insertOne(pedido, function(err){
        assert.equal(err, null);
    });

    var contexto={
        mensaje: true,
        layout:false
    };

   res.redirect('/carro?sent=true');

});
