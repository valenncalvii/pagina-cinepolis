//API UTILIZADA: TMDB API

let pagina = 1; 
const busquedaEl = document.getElementById('busqueda'); //ELEMENTO DE LA BARRA DE BUSQUEDA
const btnAnteriorEl = document.getElementById('btnAnterior'); //ELEMENTO DEL BOTON DE ANTERIOR
const btnSiguienteEl = document.getElementById('btnSiguiente');//ELEMENTO DEL BOTON DE SIGUIENTE

//EVENTOS PARA PERMITIRNOS PASAR DE UNA PAGINA A LA OTRA
btnSiguienteEl.addEventListener("click", () => {  
  if(pagina < 1000){
    pagina += 1;
    CargarPeliculas();
  }
});
btnAnteriorEl.addEventListener("click", () => {   
  if(pagina > 1){
    pagina -= 1;
    CargarPeliculas();
  }
});

//EVENTO QUE AL HACER ENTER LE PERMITE A LA PAGINA MOSTRARNOS LA PELICULA O RESULTADOS SIMILARES A LOS QUE BUSCAMOS
busquedaEl.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    const busqueda = busquedaEl.value;
    if (busqueda) {
      pagina = 1;
      CargarPeliculasPorBusqueda(busqueda);
    }
    else{
      CargarPeliculas();
    }
  }
});

//FUNCION PARA CARGAR LA PAGINA CON LAS PELICULAS
async function CargarPeliculas() {
      const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=ae67b520ccbaec1116a6f72fa3310d63&languaje=es-MX&page=${pagina}`);
    
    const datos = await respuesta.json();
     
    let peliculas = ''
    datos.results.forEach(pelicula => {
      peliculas += `
      <a href = "detalle_pelicula.html?id=${pelicula.id}">
      <div class="pelicula">
      <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
      <h3 class="titulo">${pelicula.title}</h3>
      </div>
      </a>
      `
    });
  document.getElementById('contenedor-favoriteMovies').innerHTML = peliculas
};


//FUNCION PARA CARGAR LA PAGINA CON LAS PELICULAS ATRAVES DEL BUSCADOR
async function CargarPeliculasPorBusqueda(busqueda) {
    const respuesta = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=ae67b520ccbaec1116a6f72fa3310d63&language=es-MX&query=${busqueda}&page=${pagina}`);
    if (respuesta.status === 200) {
      const datos = await respuesta.json();

      let peliculas = '';
      datos.results.forEach(pelicula => {
        peliculas += `
        <a  href = "detalle_pelicula.html?id=${pelicula.id}">
        <div class="pelicula">
        <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
        <h3 class="titulo">${pelicula.title}</h3>
        </div>
        </a>
        `;
      });
      document.getElementById('contenedor-favoriteMovies').innerHTML = peliculas;
    }
    else if(respuesta.status === 404){`
    <h2>PELICULA NO ENCONTRADA</h2>
    `
      document.getElementById('contenedor-favoriteMovies').innerHTML = peliculas;
    }
};
CargarPeliculas();


