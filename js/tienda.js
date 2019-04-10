var express= require('express');
var motorRender = require('express-handlebars');
var app= express();



// configurar la carpeta public como "pública"
app.use(express.static('public'));


app.engine('handlebars', motorRender());
app.set('view engine', 'handlebars');