// Variable que controla la página actual
let pagina = 1;

// Selecciona los botones de navegación por sus IDs en el DOM
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');

// Evento para el botón "Siguiente"
// Aumenta la variable "pagina" en 1 y carga las películas de la nueva página
btnSiguiente.addEventListener('click', () => {
    if (pagina < 1000) { // Limita el rango máximo de páginas a 1000
        pagina += 1;
        cargarPeliculas(); // Llama a la función para cargar películas de la nueva página
    }
});

// Evento para el botón "Anterior"
// Disminuye la variable "pagina" en 1 y carga las películas de la página anterior
btnAnterior.addEventListener('click', () => {
    if (pagina > 1) { // Evita que la página baje de 1
        pagina -= 1;
        cargarPeliculas(); // Llama a la función para cargar películas de la nueva página
    }
});

// Función asíncrona para cargar películas desde la API
const cargarPeliculas = async () => {
    try {
        // Realiza una solicitud HTTP GET a la API de TMDB
        const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=8517c57b008f34acca724b3af2cf4c49&language=es-MX&page=${pagina}`);
        
        console.log(respuesta); // Muestra la respuesta en la consola para depuración

        // Verifica si la solicitud fue exitosa (código de estado 200)
        if (respuesta.status === 200) {
            const datos = await respuesta.json(); // Convierte la respuesta a un objeto JSON
            
            let peliculas = ''; // Variable para almacenar el HTML de las películas
            
            // Itera sobre los resultados de las películas y genera el HTML para cada una
            datos.results.forEach(pelicula => {
                peliculas += `
                    <div class="pelicula">
                        <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
                        <h3 class="titulo">${pelicula.title}</h3>
                    </div>
                `;
            });

            // Inserta el HTML generado en el contenedor con el ID "contenedor"
            document.getElementById('contenedor').innerHTML = peliculas;

        } else if (respuesta.status === 401) {
            // Error 401: Problema con la clave API
            console.log('Pusiste la llave mal');
        } else if (respuesta.status === 404) {
            // Error 404: No se encontraron resultados
            console.log('La pelicula que buscas no existe');
        } else {
            // Otros errores no especificados
            console.log('Hubo un error y no sabemos que paso');
        }

    } catch (error) {
        // Captura y muestra cualquier error ocurrido durante la solicitud o procesamiento
        console.log(error);
    }
}

// Llama a la función cargarPelículas por primera vez para cargar la página inicial (1)
cargarPeliculas();
