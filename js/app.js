// Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListener();
function cargarEventListener() {
    //Cuando agregas un curso presionando "Agregar al Carrito"
    listaCursos.addEventListener('click', agregarCurso);

    //Remove course from cart
    carrito.addEventListener('click', eliminarCurso)

    //Vaciar carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = []; //reset the cart


        limpiarHTML(); //Remove all HTML
    })
}

//Funciones
function agregarCurso(e) {
    e.preventDefault();

    if (e.target.classList.contains('agregar-carrito') ){
        const cursoSeleccionado = e.target.parentElement.parentElement;

        leerDatosCurso(cursoSeleccionado);
    }
    
}


//Remove course from cart
function eliminarCurso(e) {
    if (e.target.classList.contains('borrar-curso') ) {
        const cursoId = e.target.getAttribute('data-id');

        //Elimina del arreglo de articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId );

        carritoHTML(); //Iterar sobre el carrito y mostrar su HTML
    }
}


//Lee el contenido del HTML al que le dimos click y extrae la informacion del curso

function leerDatosCurso(curso) {
    //console.log(curso);

    //Crear un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }


//Revisa si un elemento ya existe en el carrito
const existe = articulosCarrito.some( curso => curso.id === infoCurso.id );

if( existe ) {
    //Actualiza la cantidad
    const cursos = articulosCarrito.map( curso => { 
        if ( curso.id === infoCurso.id ) {
            curso.cantidad++;
            return curso; //return the object update
        } else {
            return curso; //returns the objects are not duplicates
        }
    } );
    articulosCarrito = [...cursos];
} else {
    //Add elements to array carrito
    articulosCarrito = [...articulosCarrito, infoCurso];
}


    console.log(articulosCarrito);

    carritoHTML();
}


//Show cart in the HTML
function carritoHTML() {

    //Clean the HTML
    limpiarHTML();

    
    //Walk the cart and generate the HTML
    articulosCarrito.forEach( curso => {
        const { imagen, titulo, precio, cantidad, id } = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td> <img src="${imagen}" width="100"> </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>   
                <a href="#" class="borrar-curso" data-id="${id}" > X </a>
            </td>
        `;

        //Add the HTML of cart in the table body
        contenedorCarrito.appendChild(row)
    })
}


//Remove the course from tbody
function limpiarHTML() {
    //Slow mode
    //contenedorCarrito.innerHTML = '';


    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}