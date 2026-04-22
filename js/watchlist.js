const addedMovies = document.getElementById("added-movies")

// Load saved movies from localStorage
window.addEventListener("DOMContentLoaded", () => {
    const saved = localStorage.getItem("watchlist")
    let storeMovies = saved ? JSON.parse(saved) : []
    
    if (storeMovies.length === 0) {
        addedMovies.innerHTML = `
            <div class="placeholder">
                <i class="fa-solid fa-clapperboard movie"></i>
                <h2>Your watchlist is empty</h2>
                <a href="index.html">Search for movies</a>
            </div>
        `
    } else {
        let html = ""
        storeMovies.forEach(movie => {
            html += `
                <div id="movie-container">
                    <img src="${movie.Poster}" id="movie-pic">
                    <div id="details ${movie.imdbID}">
                        <h1>${movie.Title}</h1>
                        <h2>${movie.Year}</h2>
                        <p>${movie.Type}</p>
                        <button type="button" class="remove-btn" data-id="${movie.imdbID}">Remove from watchlist</button>
                    </div>
                </div>
            `
        })
        addedMovies.innerHTML = html
        
      
        const removeButtons = document.querySelectorAll(".remove-btn")
        removeButtons.forEach(btn => {
            btn.addEventListener("click", handleRemove)
        })
    }
})

function handleRemove(e) {
    const movieId = e.target.dataset.id
    const saved = localStorage.getItem("watchlist")
    let storeMovies = JSON.parse(saved)
    
    
    storeMovies = storeMovies.filter(movie => movie.imdbID !== movieId)
    
 
    localStorage.setItem("watchlist", JSON.stringify(storeMovies))
    
    // Reload the page to reflect changes
    location.reload()
}
