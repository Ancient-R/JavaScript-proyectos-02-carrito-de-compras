const cursos = document.getElementById('lista-cursos')
const carrito = document.getElementById('carrito')
const listaCursos = document.querySelector('#lista-carrito tbody')
const botonVaciarCarrito = document.getElementById('vaciar-carrito')

//Funciones

    //Función que añade el curso al carrito
const comprarCurso = (e) =>{
    e.preventDefault()
    if(e.target.classList.contains('agregar-carrito')){
        const curso = e.target.parentElement.parentElement

        leerDatosCurso(curso)
    }
}

    //Lee los datos del curso seleccionado anteriormente
leerDatosCurso = (curso) =>{
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id')
    }

    insertarCarrito(infoCurso)
}

    //Agrega el curso al DOM
const insertarCarrito = (curso) =>{
    const fragment = document.createDocumentFragment()
    const row = document.createElement('tr')
    row.innerHTML = `
        <td>
            <img src = "${curso.imagen}" width= "100"            
        </td>
        <td>"${curso.titulo}</td>
        <td>"${curso.precio}</td>
        <td>
            <a href = "#" class ="borrar-curso" data-id="${curso.id}">X</a>
        </td>
    `
    fragment.appendChild(row)
    listaCursos.appendChild(fragment)

    guardarCursoLocalStorage(curso)
}

    //Elimina el curso del DOM
const borrarCurso = (e) =>{
    e.preventDefault()
    if(e.target.className === 'borrar-curso'){
        e.target.parentElement.parentElement.remove()

        cursoId = e.target.parentElement.parentElement.querySelector('a').getAttribute('data-id')
    }

    borrarCursoLocalStorage(cursoId)
}

    //Vaciamos el carrito mientras haya elementos
const vaciarCarrito = () =>{
    while(listaCursos.firstChild){
        listaCursos.removeChild(listaCursos.firstChild)
    }

    vaciarLocalStorage()
}


    //Agregar cursos a LocalStorage
const guardarCursoLocalStorage = (curso) =>{
    let cursosLS = obtenerCursoLocalStorage()
    cursosLS.push(curso)

    localStorage.setItem('cursos', JSON.stringify(cursosLS))
}

    //Verificamos el estado del LocalStorage
const obtenerCursoLocalStorage = () =>{
    let cursos
    if(localStorage.getItem('cursos') === null) cursos = []
    else cursos = JSON.parse(localStorage.getItem('cursos'))
    return cursos
}

    //Obtenemos los cursos guardados si los hay
const leerLocalStorage = () =>{
    let cursosLS = obtenerCursoLocalStorage()

    cursosLS.forEach((curso) =>{
        const fragment = document.createDocumentFragment()
        const row = document.createElement('tr')
        row.innerHTML = `
        <td>
            <img src = "${curso.imagen}" width= "100"            
        </td>
        <td>"${curso.titulo}</td>
        <td>"${curso.precio}</td>
        <td>
            <a href = "#" class ="borrar-curso" data-id="${curso.id}">X</a>
        </td>
    `
        fragment.appendChild(row)
        listaCursos.appendChild(fragment)

    })
}

    //Eliminamos el curso o los cursos de LocalStorage
const borrarCursoLocalStorage = (cursoId) =>{
    let cursosLS = obtenerCursoLocalStorage()
    
    cursosLS.forEach((cursoLS, index) =>{
        if(cursoLS.id === cursoId) cursosLS.splice(index, 1)
    })

    localStorage.setItem('cursos', JSON.stringify(cursosLS))
}

    //Elimina todos los cursos del LocalStorage
const vaciarLocalStorage = () =>{
    localStorage.clear()
}
//Event Listeners

const eventListener = () => {

    //Al hacer click en comprar
    cursos.addEventListener('click', comprarCurso)

    //Al hacer click en borrar curso en el carrito
    carrito.addEventListener('click', borrarCurso)

    //Para vaciar el carrito de compras
    botonVaciarCarrito.addEventListener('click', vaciarCarrito)

    //Muestra los cursos al cargar la página
    document.addEventListener('DOMContentLoaded', leerLocalStorage)
}

eventListener()