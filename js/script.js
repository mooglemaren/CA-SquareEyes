const products=[]

async function getAllProducts() {
  try {
    const api = `https://v2.api.noroff.dev/square-eyes`;
    const response = await fetch(api);
    console.log(api);
    if (!response.ok) throw new Error(`HTTP error! ${response.status}`);
    const obj = await response.json();
    console.log(obj);
    return obj.data;
  } catch (error) {
    console.error(error.message);
    alert("Could not fetch data");
  }
}

async function initMainPage() {
  const productsResponse = await getAllProducts();
  if (!productsResponse) return;
  productsResponse.forEach(movie =>products.push(movie));
  const frontPageProducts = products.slice(0, 3);
  console.log(frontPageProducts);
  frontPageProducts.forEach(movie =>{
    addMovieToFrontpage(movie)
  })
}

function addMovieToFrontpage(movie) {
  const movieSection = document.getElementById("frontpage_movies");
  const link = document.createElement("a");
  const figure = document.createElement("figure");
  const poster = document.createElement("img");
  const figcaption = document.createElement("figcaption");
  poster.src = movie.image?.url;
  poster.alt = movie.image?.alt;
  figcaption.innerHTML = "View now!";
  link.href = "/product.html";
  figure.appendChild(poster);
  figure.appendChild(figcaption);
  link.appendChild(figure);
  movieSection.appendChild(link);
}

/*function displayAllMovies(movie) {
    const movieSection = document.getElementById("full_movieslist");
  const link = document.createElement("a");
  const figure = document.createElement("figure");
  const poster = document.createElement("img");
  const figcaption = document.createElement("figcaption");
  poster.src = movie.image?.url;
  poster.alt = movie.image?.alt;
  figcaption.innerHTML = "View now!";
  link.href = "/product.html";
  figure.appendChild(poster);
  figure.appendChild(figcaption);
  link.appendChild(figure);
  movieSection.appendChild(link);
}

async function initDisplayAll() {
    const productsResponse = await getAllProducts();
    if (!productsResponse) return;
    productsResponse.forEach(movie =>products.push(movie));
    const full_movieslist = products;
    console.log(full_movieslist);
    full_movieslist.forEach(movie =>{
      addMovieToDisplaypage(movie)
    })
  }*/

window.addEventListener("DOMContentLoaded", function () {
  initMainPage();
});
