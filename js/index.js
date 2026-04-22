const searchBtn = document.getElementById("search-btn")
const searchInput = document.getElementById("movie-search")
const renderMovies = document.getElementById("movies")
const placeholderHtml = document.getElementById("placeholder")
let storeMovies = []

import { apiKey } from "./key.js"


window.addEventListener("DOMContentLoaded", () => {
    const saved = localStorage.getItem("watchlist")
    if (saved) {
        storeMovies = JSON.parse(saved)
    }
})

searchBtn.addEventListener("click", async () =>{

    const searchValue = searchInput.value

    const res = await fetch(`http://www.omdbapi.com/?t=${searchValue}&s=${searchValue}&apikey=${apiKey}`)
    const data = await res.json()
    console.log(data)
    const results = data.Search
    let html = ""

    results.forEach(element => {
        html += `
        <div id="movie-container">

        <img src="${element.Poster}" id="movie-pic">

        <div id="details ${element.imdbID}">

            <h1>${element.Title}</h1>
            <h2>${element.Year}</h2>
            <p>${element.Type}</p>

            <button type="button" class="watchlist-btn" data-id="${element.imdbID}" data-title="${element.Title}">Add to watchlist</button>

        </div>
       </div>
       
    `
        
    })

    placeholderHtml.style.display = "none"
    renderMovies.innerHTML = html

    const buttons = document.querySelectorAll(".watchlist-btn")
    buttons.forEach(button => {
        button.addEventListener("click", handleWatchlistBtn)
    })
})

function handleWatchlistBtn(e) {
    const movieId = e.target.dataset.id
    const movieTitle = e.target.dataset.title
    
    // Get movie details from the DOM
    const movieContainer = e.target.closest("#movie-container")
    const poster = movieContainer.querySelector("#movie-pic").src
    const year = movieContainer.querySelector("h2").textContent
    const type = movieContainer.querySelector("p").textContent
    
    // Create movie object
    const movie = {
        imdbID: movieId,
        Title: movieTitle,
        Poster: poster,
        Year: year,
        Type: type
    }
    
    const exists = storeMovies.some(m => m.imdbID === movieId)
    
    if (!exists) {
        storeMovies.push(movie)
        localStorage.setItem("watchlist", JSON.stringify(storeMovies))
        alert(`Added to watchlist: ${movieTitle}`)
    } else {
        alert(`${movieTitle} is already in your watchlist`)
    }
}


 
 