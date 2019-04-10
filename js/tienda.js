var express= require('express');
var app= express();


// configurar la carpeta public como "pública"
app.use(express.static('public'));