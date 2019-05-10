const MongoClient = require('mongodb').MongoClient,
    ObjectID = require('mongodb').ObjectID,
    engines = require('consolidate');


var express = require('express');
var motorRender = require('express-handlebars');
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


    };
    res.render('home', contexto);
});
/** 
app.get('/tienda', function (req, res) {
    
    var productos = db.collection('productos').find();

    productos.toArray((err, result) => {
        var contexto = {

            lista: result,
           
        };
        res.render('tienda', contexto);
    });

    
});
*/
app.get('/tienda/:categoria?', function(req,res){
 var query={};
 if(req.params.categoria){
     query.categoria= req.params.categoria;
 }
 
 
 var productos= db.collection('productos');
 productos.find(query).toArray((err,resultList)=>{
    contexto={
        lista:resultList,
        categoria: req.params.categoria,
        
    };
res.render('tienda', contexto);
 });
});


app.get('/tienda/:serie?', function(req,res){
    var query={};
    if(req.params.serie){
        query.serie= req.params.serie;
    }
   
    
    var productos= db.collection('productos');
    productos.find(query).toArray((err,resultList)=>{
       contexto={
           lista:resultList,
           serie: req.params.serie,
           
       };
   res.render('tienda', contexto);
    });
   });




app.get('/producto/:id', function(req,res){

    var contexto=null;
    var query= {};
    if(req.params.id){
        query.id= parseInt(req.params.id);
        
    }

    if(req.params.categoria){
        query.categoria= req.params.categoria;
    }

    var productos = db.collection('productos').find(query).toArray((err, resultList) => {
       
        contexto ={

            producto :resultList[0],
          
           esShirt: req.params.categoria=="shirt",
        }
        res.render('producto', contexto);
    });

});

app.get('/carro', function(req,res){

    var contexto=null;

   res.render('carrito', contexto);
  

});
