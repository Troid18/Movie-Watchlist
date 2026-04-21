const searchBtn = document.getElementById("search-btn")
const searchInput = document.getElementById("movie-search")
const renderMovies = document.getElementById("movies")
const placeholderHtml = document.getElementById("placeholder")

searchBtn.addEventListener("click", async () =>{

    const searchValue = searchInput.value

    const res = await fetch(`http://www.omdbapi.com/?t=${searchValue}&s=${searchValue}&apikey=65ae8504`)
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

        </div>
       </div>
       
    `
        
    })

    placeholderHtml.style.display = "none"
    renderMovies.innerHTML = html


    //{
//     "Title": "Blade Runner",
//     "Year": "1982",
//     "imdbID": "tt0083658",
//     "Type": "movie",
//     "Poster": "https://m.media-amazon.com/images/M/MV5BOWQ4YTBmNTQtMDYxMC00NGFjLTkwOGQtNzdhNmY1Nzc1MzUxXkEyXkFqcGc@._V1_SX300.jpg"
// }

// 
})