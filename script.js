const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=657cb157a7fd6debbacfbe852148213d&page=1';

const IMG_PATH = 'https://image.tmdb.org/t/p/w500';
const SEARCH_URL = 'https://api.themoviedb.org/3/search/movie?api_key=657cb157a7fd6debbacfbe852148213d&query="';

const form = document.querySelector("#form");
const search = document.querySelector("#search");
const main = document.querySelector("#main");

getMovies(API_URL);

async function getMovies(url) {
    let res = await fetch(url);
    let data = await res.json();

    showMovies(data.results);
}

function showMovies(movies) {

    main.innerHTML = "";

    movies.forEach(movie => {
        let {title, poster_path, vote_average, overview} = movie;
        let movieElement = document.createElement("div");
        movieElement.classList.add("movie");
        movieElement.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
                <h2>${title}</h2>
                <span class="vote">${vote_average}/10</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                <p>${overview}</p>
            </div>`;
        main.appendChild(movieElement);
    });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    let searchTerm = search.value;

    if(searchTerm && searchTerm !== "") {
        getMovies(SEARCH_URL + searchTerm);
        search.value = "";
    } else {
        window.location.reload();
    }
})
