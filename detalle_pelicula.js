//ID DE LA PELICULA DE LA URL
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');

//ELEMENTO QUE GUARDA LOS DATOS DE LA PELICULA
const detallesEl = document.getElementById('movieDetails');

//FUNCION QUE MUESTRA LOS DATOS DE LA PELICULA SELECCIONADA
async function CargarDatosPelicula() {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=ae67b520ccbaec1116a6f72fa3310d63&language=es-MX`);
    if (response.ok) {
      const respuesta = await response.json();
      //SE LLENA EL ELEMENTO CON LOS DATOS DE LA PELICULA
      detallesEl.innerHTML = `
      <div class="info-peli">
      <h1>${respuesta.title}</h1>
       <img src="https://image.tmdb.org/t/p/w500/${respuesta.poster_path}" alt="${respuesta.title}">
       <p>Descripción: ${respuesta.overview}</p>
       <p>Fecha de lanzamiento: ${respuesta.release_date}</p>
       <p>⭐${respuesta.vote_average}</p>
      </div> 
      `;
    }
}

CargarDatosPelicula();