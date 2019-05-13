function paginaCargada() {

    var inputPrecio = document.querySelector('#inputPrecio');

    inputPrecio.addEventListener('change', filtrarPrecio);

    function filtrarPrecio() {
        
        location.href = '/tienda?precio='+inputPrecio.value+'';
    }

    var listaProductos = [];

    var total = 0;

    var carritoNum = document.querySelector('.car__num');
    var listaCarrito = document.querySelector('.car-list');

    if (localStorage.getItem('listaProductos') != null) {
        listaProductos = JSON.parse(localStorage.getItem('listaProductos'));
    }

    function actualizarCarrito() {
        carritoNum.innerHTML = listaProductos.length;
        if (listaCarrito != null) {

            listaCarrito.innerHTML = '';

            listaProductos.forEach(function (producto) {

                total += (producto.precio * producto.cantidad);

                listaCarrito.innerHTML += '<div class="item-lista"><img class="item-lista-img" src="' + producto.imagen + '" width="70"> <h3>' + producto.nombre + '</h3> <h4> '+ producto.cantidad +' </h4> <h4> $'+ (producto.precio * producto.cantidad) +' </h4> <div class="item-lista-borrar"></div> </div';
            });

            var tituloTotal = document.querySelector('#total').innerHTML = total;
            var inputTotal = document.querySelector('#inputTotal').value = total;

        }

        var btnBorrar = document.querySelectorAll('.item-lista-borrar');

        for (let i = 0; i < btnBorrar.length; i++) {
            const boton = btnBorrar[i];

            boton.addEventListener('click', borrarCarrito);

            function borrarCarrito() {

                listaProductos.splice(i, 1);

                localStorage.setItem('listaProductos', JSON.stringify(listaProductos));

                //
                window.location.reload(true);
            }
        }
    }

    actualizarCarrito();



    var botonProductoAnadirCarro = document.querySelector('.producto__btn');

    function agregarAlCarrito() {
        var nombre = document.querySelector('.producto__title').innerText;
        var precio = document.querySelector('#precio').innerHTML;
        var imagen = document.querySelector('#productoImagen').src;
        var cantidad = document.querySelector('#cantidad').value;

        console.log(cantidad);

        var producto = {
            nombre,
            precio: parseInt(precio),
            imagen,
            cantidad: parseInt(cantidad),
        };

        listaProductos.push(producto);
        carritoNum.innerHTML = listaProductos.length;


        localStorage.setItem('listaProductos', JSON.stringify(listaProductos));

    }
    if (botonProductoAnadirCarro != null) {
        botonProductoAnadirCarro.addEventListener('click', agregarAlCarrito);
    }


    /** 
    var alfabet= document.querySelector('.orden_alfabet');
    
   
    var listaNombre=[];
    function ordenAlfabetico(){
        var nombres= document.querySelectorAll('.producto__nombre');
        nombres.forEach(function(nombre){
            listaNombre.push(nombre);
        });
        listaNombre.sort();

    }
    alfabet.addEventListener('click', ordenAlfabetico);
*/
}
window.addEventListener('load', paginaCargada);