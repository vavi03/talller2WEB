function paginaCargada() {

    var listaProductos = [];
    var carritoNum = document.querySelector('.car__num');
    var listaCarrito = document.querySelector('.lista-carrito');

    if (localStorage.getItem('listaProductos') != null) {
        listaProductos = JSON.parse(localStorage.getItem('listaProductos'));
    }


    function actualizarCarrito() {
        carritoNum.innerHTML = listaProductos.length;
        if (listaCarrito != null) {

            listaCarrito.innerHTML = '';

            listaProductos.forEach(function (producto) {
                listaCarrito.innerHTML += '<img src="' + producto.imagen + '" width="50">' + producto.nombre;
            });
        }
    }

    actualizarCarrito();



    var botonProductoAnadirCarro = document.querySelector('.producto__btn');

    function agregarAlCarrito() {
        var nombre = document.querySelector('.producto__title').innerText;
        var precio = document.querySelector('.producto__precio').innerText;
        var imagen = document.querySelector('.producto__imagen').src;
        var producto = {
            nombre: nombre,
            precio: precio,
            imagen: imagen,
        };

        listaProductos.push(producto);
        carritoNum.innerHTML = listaProductos.length;
        localStorage.setItem('listaProductos', JSON.stringify(listaProductos));
    }
    if (botonProductoAnadirCarro != null) {
        botonProductoAnadirCarro.addEventListener('click', agregarAlCarrito);
    }











}
window.addEventListener('load', paginaCargada);