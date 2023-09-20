const menu = document.querySelector('.lineas');
const navegacion = document.querySelector('.navegacion');
const imagenes = document.querySelectorAll('img');
const btnTodos = document.querySelector('.Todos');
const btnRecientes = document.querySelector('.Recientes');
const btnTazas = document.querySelector('.Tazas');
const btnCarteras = document.querySelector('.Carteras');
const btnOtros = document.querySelector('.Otros');
const contenedorProductos = document.querySelector('.productos');
document.addEventListener('DOMContentLoaded',()=>{
    eventos();
    productos();
});

const eventos = () => {
    menu.addEventListener('click',abrirMenu);
}

const abrirMenu = () => {
    navegacion.classList.remove('ocultar');
    botonCerrar();
}

const botonCerrar = () => {
    const btnCerrar = document.createElement('p');
    const overlay = document.createElement('div');
    overlay.classList.add('pantalla-completa');
    const body =document.querySelector('body');
    if(document.querySelectorAll('.pantalla-completa').length > 0) return;
    body.appendChild(overlay);
    btnCerrar.textContent = 'x';
    btnCerrar.classList.add('btn-cerrar');

    /*while(navegacion.children[5]){
        navegacion.removeChild(navegacion.children[5]);
    }  Esta es otra forma de hacer lo del "boton.remove()"*/
    
    navegacion.appendChild(btnCerrar);
    cerrarMenu(btnCerrar, overlay);
}

const observer = new IntersectionObserver((entries, observer)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            const imagen = entry.target;
            imagen.src =imagen.dataset.src;
            observer.unobserve(imagen);
        }
    });
});

imagenes.forEach(imagen=>{
    observer.observe(imagen);
});

const cerrarMenu = (boton, overlay) =>{
    boton.addEventListener('click',()=>{
        navegacion.classList.add('ocultar');
        overlay.remove();
        boton.remove();
    });

    overlay.onclick = function(){
        overlay.remove();
        navegacion.classList.add('ocultar');
        boton.remove();
    }

}

const productos = () =>{
    let productosArreglo = [];
    const productos = document.querySelectorAll('.producto');

    productos.forEach(producto=> productosArreglo = [...productosArreglo,producto]);

    const Recientes = productosArreglo.filter(Recientes=> Recientes.getAttribute('data-producto') === 'Recientes');
    const Tazas     = productosArreglo.filter(Tazas=> Tazas.getAttribute('data-producto') === 'Tazas');
    const Carteras  = productosArreglo.filter(Carteras=> Carteras.getAttribute('data-producto') === 'Carteras');
    const Otros     = productosArreglo.filter(Otros=> Otros.getAttribute('data-producto') === 'Otros');  
    mostrarProductos(Recientes, Tazas, Carteras, Otros, productosArreglo);     
}

const mostrarProductos =(Recientes, Tazas, Carteras, Otros, Todos) =>{
    btnRecientes.addEventListener('click',()=>{
        limpiarHtml(contenedorProductos);
        Recientes.forEach(Recientes=> contenedorProductos.appendChild(Recientes));
    });
    btnTazas.addEventListener('click',()=>{
        limpiarHtml(contenedorProductos);
        Tazas.forEach(Tazas=> contenedorProductos.appendChild(Tazas));
    });
    btnCarteras.addEventListener('click',()=>{
        limpiarHtml(contenedorProductos);
        Carteras.forEach(Carteras=> contenedorProductos.appendChild(Carteras));
    });
    btnOtros.addEventListener('click',()=>{
        limpiarHtml(contenedorProductos);
        Otros.forEach(Otros=> contenedorProductos.appendChild(Otros));
    });
    btnTodos.addEventListener('click',()=>{
        limpiarHtml(contenedorProductos);
        Todos.forEach(Todos=> contenedorProductos.appendChild(Todos));
    });

}

const limpiarHtml = (contenedor) =>{
    while(contenedor.firstChild){
        contenedor.removeChild(contenedor.firstChild);
    }
}

