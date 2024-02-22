const products = [];

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

async function populateMovieDisplays() {
  const productsResponse = await getAllProducts();
  if (!productsResponse) return;
  productsResponse.forEach((movie) => products.push(movie));
  const frontPageProducts = products.slice(0, 3);
  console.log(frontPageProducts);
  frontPageProducts.forEach((movie) => {
    addMovieToElement(movie, "frontpage_movies");
  });
  products.forEach((movie) => {
    addMovieToElement(movie, "full_movieslist");
    addMovieToCart(movie);
  });
}

 function addMovieToCart(movie){
  // ta id + bruke getFromLocalStorage, hvis return , legge til i html på cart, ny movietocart funksjon uten cartbutt,style annerledes
}

function addMovieToElement(movie, elementID) {
  const movieSection = document.getElementById(elementID);
  if (!movieSection) return;
  const link = document.createElement("a");
  const figure = document.createElement("figure");
  const poster = document.createElement("img");
  const figcaption = document.createElement("figcaption");
  const cartbutt = document.createElement("button");
  const cartimg = document.createElement("img");
  cartbutt.classList.add("cart_button");
  cartbutt.onclick = (e) => toggleCartChange(e, movie.id);
  cartimg.src = "./images/cart.svg";
  poster.classList.add("movies_posters");
  poster.src = movie.image?.url;
  poster.alt = movie.image?.alt;
  figcaption.innerHTML = "View now!";
  link.href = "/product.html";
  cartbutt.appendChild(cartimg);
  figure.appendChild(link);
  figure.appendChild(cartbutt);
  link.appendChild(poster);
  link.appendChild(figcaption);
  movieSection.appendChild(figure);
}

function toggleCartChange(event, movieID) {
  const active = event.currentTarget.classList.contains("active");
  if (active) {
    event.currentTarget.classList.remove("active");
  } else {
    event.currentTarget.classList.add("active");
    saveToLocalStorage(movieID);
  }
}

function saveToLocalStorage(movieID) {
  try {
    localStorage.setItem(movieID, movieID);
  } catch (e) {}
}

function getFromLocalStorage(movieID) {
  try {
    localStorage.getItem(movieID);
  } catch (e) {}
}


window.addEventListener("DOMContentLoaded", function () {
  populateMovieDisplays();
});
