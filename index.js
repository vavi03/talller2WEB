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

app.get('/tienda', function (req, res) {

    var productos = db.collection('productos').find();

    productos.toArray((err, result) => {
        var contexto = {

            lista: result
    
        };
        res.render('tienda', contexto);
    });

    
});

app.get('/producto/:id', function(req,res){

    var contexto=null;

    var productos = db.collection('productos').find({
        id: parseInt(req.params.id)
    }).toArray((err, resultList) => {
       
        contexto = resultList[0];

        res.render('producto', contexto);
    });

});
