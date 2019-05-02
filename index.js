var express = require('express');
var motorRender = require('express-handlebars');
var app = express();



// configurar la carpeta public como "pública"
app.use(express.static('public'));


app.engine('handlebars', motorRender());
app.set('view engine', 'handlebars');


var productos = [];

productos.push({
    nombre: 'March Lions Meow Tote Bag ',
    id: 'marchbag',
    precio: '10000',
    imagen: 'https://shaftten.fs-storage.jp/fs2cabinet/det/detail-SH00009/detail-SH00009-m-01-dl.jpg',
    descripcion: 'Body: 420mm x 380mm x 130mm Handle: about 30mm x 550mm',
},{
    nombre: 'Fate EXTRA Last Encore Tote Bag Saver (2 cans included)',
    id: 'fatebag',
    precio: '10000',
    imagen: 'https://shaftten.fs-storage.jp/fs2cabinet/det/detail-SH00222/detail-SH00222-m-01-dl.jpg',
    descripcion: 'Three new tote bags from "Fate / EXTRA Last Encore"! Design is drawn by SE.RA.PH letters of Saber Archer Gawains treasure name! Each tote bag comes with a can badge designed with the illustration of the Servant and the master curse.'
},{
    nombre: 'March Lion Production Notes [Collection of setting materials]',
    id: 'marchnotes',
    precio: '10000',
    imagen: 'https://shaftten.fs-storage.jp/fs2cabinet/det/detail-SH00003/detail-SH00003-m-01-dl.jpg',
    descripcion: 'The cover illustrations are character designer Nobuhiro Sugiyama and the sisters of Mr. Zero and Mr. Kawamoto, who have Kuro-chan drawn down. Finished with an image like a Japanese painting. Nobuhiro Sugiyama (front cover illustration): We aimed to create a warm painting with an emphasis on atmosphere, different from cell painting in animation. I hope you can feel the air in the original here.',
},{
    nombre: 'Fate / EXTRA Last Encore ED Illustration Book',
    id: 'fatebook',
    precio: '10000',
    imagen: 'https://shaftten.fs-storage.jp/fs2cabinet/det/detail-SH00306/detail-SH00306-m-01-dl.jpg',
    descripcion: 'All 13 kinds of patterns drawn down for each episode are also included, and all 26 illustrations are finished with high definition printing. The body contains a transparent sleeve case.',
},{
    nombre: 'Shinobu Oshino "Panoi!" T-shirt M size',
    id: 'monoshirt',
    precio: '10000',
    imagen: 'https://shaftten.fs-storage.jp/fs2cabinet/det/detail-SH00159/detail-SH00159-m-01-dl.jpg',
    descripcion: 'Shinobu Oshino "Panoi!" T-shirt.  It is a cute T-shirt that looks into the hole of the favorite donut!',
},
{
    nombre: 'Shaft Logo T-shirt Black',
    id: 'shaftshirt',
    precio: '10000',
    imagen: 'https://shaftten.fs-storage.jp/fs2cabinet/det/detail-SH00201/detail-SH00201-m-01-dl.jpg',
    descripcion: 'It is a simple, easy to match two colors of black and white. Wear it under the shirt and show the logo, and it is easy to put on the badge of your favorite character and arrange it.'
},
{
    nombre: 'T-shirt <Story Series> Shinobu Oshino / Makoto Hachikuji / Yunogi ',
    id: 'monoshirt2',
    precio: '10000',
    imagen: 'https://shaftten.fs-storage.jp/fs2cabinet/det/detail-SH00021/detail-SH00021-m-01-dl.jpg',
    descripcion: 'I made a full-color T-shirt wearing a white dress and playing with soap bubbles "Shinobu Oshino", "Hachikuji Makoto", and "Ko Nogi Yousuke". The ground color of the T-shirt is gray. You can wear it to Sharp.',
},

{
    nombre: 'March March Lion T-shirt',
     id: 'marchshirt',
    precio: '10000',
    imagen: 'https://shaftten.fs-storage.jp/fs2cabinet/det/detail-SH00021/detail-SH00021-m-01-dl.jpg',
    descripcion: 'From the TV anime "Moon Lion", T-shirts are new! It is a lovely item designed "Nya Shogi" that is a fake cat made of a piece of shogi that appears in the work. ',
},
{
    nombre: 'shaft logo bag ',
    id: 'shaftbag',
    precio: '10000',
    imagen: 'https://shaftten.fs-storage.jp/fs2cabinet/det/detail-SH00021/detail-SH00021-m-01-dl.jpg',
    descripcion: 'Because it is a nylon material, it is light and bulky and can be used as a sub bag. Simply as it is, you can enjoy arranging it with your favorite can badge! It is also useful for wallets and cell phones for events.',
},
{
    nombre: 'Candy T-shirt',
    id: 'monoshirt3',
    precio: '10000',
    imagen: 'https://shaftten.fs-storage.jp/fs2cabinet/det/detail-SH00021/detail-SH00021-m-01-dl.jpg',
    descripcion: 'The drawing by the theater company Inukare. We express "witch of sweets" of "Magical Girl Madoka ☆ Magica" in the atmosphere like a childrens book.',
},

 );


//configurar ruta inicial

app.get('/', function (req, res) {
    var contexto = {


    };
    res.render('home', contexto);
});

app.get('/tienda', function (req, res) {
    var contexto = {

        lista: productos

    };
    res.render('tienda', contexto);
});

app.get('/tienda/:producto', function(req,res){
var contexto=null;

productos.forEach(function(producto){
    if(producto.id == req.params.producto){
        contexto=producto;
    }
});
if(contexto == null){
    res.send('No encontré ningún producto con el nombre '+ req.params.producto);
} else {
    res.render('producto', contexto);
}

});




// iniciar el servidor en el puerto 3000
app.listen(3000, function () {
    console.log('Aplicación ejemplo, escuchando el puerto 3000!');
});