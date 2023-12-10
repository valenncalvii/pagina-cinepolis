//API UTILIZADA: TMDB API

let pagina = 1; 
const busquedaEl = document.getElementById('busqueda'); //ELEMENTO DE LA BARRA DE BUSQUEDA
const btnAnteriorEl = document.getElementById('btnAnterior'); //ELEMENTO DEL BOTON DE ANTERIOR
const btnSiguienteEl = document.getElementById('btnSiguiente');//ELEMENTO DEL BOTON DE SIGUIENTE

//EVENTOS PARA PERMITIRNOS PASAR DE UNA PAGINA A LA OTRA
btnSiguienteEl.addEventListener("click", () => {  
  mostrarSpinner();
  if(pagina < 1000){
    pagina += 1;
    cargarPeliculasAccion();

  // Simula una llamada a la API con un retardo de 2 segundos
  setTimeout(() => {
    // Lógica para cargar la página siguiente
    console.log('Página siguiente cargada');
    ocultarSpinner();
  }, 3500);
  }
});
btnAnteriorEl.addEventListener("click", () => {   
  if(pagina > 1){
    mostrarSpinner();
    pagina -= 1;
    cargarPeliculasAccion();
     // Simula una llamada a la API con un retardo de 2 segundos
  setTimeout(() => {
    // Lógica para cargar la página siguiente
    console.log('Página siguiente cargada');
    ocultarSpinner();
  }, 3500);
  }
});

//EVENTO QUE AL HACER ENTER LE PERMITE A LA PAGINA MOSTRARNOS LA PELICULA O RESULTADOS SIMILARES A LOS QUE BUSCAMOS
busquedaEl.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    const busqueda = busquedaEl.value;
    if (busqueda) {
      mostrarSpinner();
      pagina = 1;
      cargarPeliculasPorBusqueda(busqueda);
       // Simula una llamada a la API con un retardo de 2 segundos
  setTimeout(() => {
    // Lógica para cargar la página siguiente
    console.log('Página siguiente cargada');
    ocultarSpinner();
  }, 3500);
    }
    else{
      cargarPeliculasAccion();
    }
  }
});
// Función para mostrar el spinner
function mostrarSpinner() {
    document.getElementById('spinner-container').style.display = 'flex';
    document.getElementById('contenedor-favoriteMovies').style.opacity = '0.5'; // Opcional: oscurecer el fondo
  }
  
  // Función para ocultar el spinner
  function ocultarSpinner() {
    document.getElementById('spinner-container').style.display = 'none';
    document.getElementById('contenedor-favoriteMovies').style.opacity = '1';
  }


async function cargarPeliculasAccion(){
    const respuesta = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=ae67b520ccbaec1116a6f72fa3310d63&language=es-MX&page=${pagina}`);
    const datos = await respuesta.json();
    let peliculas = '';
    console.log(datos);
  for (const pelicula of datos.results) {
    const respuesta2 = await fetch(`https://api.themoviedb.org/3/movie/${pelicula.id}?api_key=ae67b520ccbaec1116a6f72fa3310d63&language=es-MX`);
    const datos2 = await respuesta2.json();

    let fecha = datos2.release_date;
    let año = fecha.slice(0, 4);
    if(pelicula.poster_path){
    peliculas += `
      <a class="link" href="detalle_pelicula.html?id=${pelicula.results}">
        <div class="pelicula">
          <figure>
            <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
            <span class="año-estreno">${año}</span>
          </figure>
          <div class="titulo-container">
            <p class="titulo">${pelicula.title}</p>
          </div>
        </div>
      </a>
    `;
  }
}
  document.getElementById('contenedor-favoriteMovies').innerHTML = peliculas;
}





  //FUNCION PARA CARGAR EN LA BARRA LATERAL IZQUIERDA LAS PELICULAS CON MEJORES RESEÑAS
async function cargarPeliculaMejorReseña(){
    const respuesta = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=ae67b520ccbaec1116a6f72fa3310d63&language=es-MX&page=${pagina}`);
    const datos = await respuesta.json();
    
    let peliculas = '';
    let corte = datos.results.slice(0, 5);
    corte.forEach(pelicula => {
      peliculas+=`
      <a class="pelicula-mejor-reseña" href="detalle_pelicula.html?id=${pelicula.id}">
        <div class="barra-izquierda-poster">
          <figure>
            <img src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
          </figure>
        </div>
        <div class="barra-izquierda-descripcion">
          <h3>${pelicula.title}</h3>
          <p>⭐${pelicula.vote_average}</p>
        </div>
      </a>
      `;    
    });
    document.getElementById('mejores-reseñas').innerHTML = peliculas;
  } 
  
cargarPeliculasAccion();
cargarPeliculaMejorReseña();