const products = [];
const genres = [];
const selectedGenres = [];

// Henter alle filmer og returnerer en liste av dem
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
  productsResponse.forEach((movie) => {
    //Hvis ikke i "genres", legg til i "genres"
    products.push(movie);
    if (!genres.includes(movie.genre)) genres.push(movie.genre);
  });
  const frontPageProducts = products.slice(0, 3);
  frontPageProducts.forEach((movie) => {
    addMovieToElement(movie, "frontpage_movies");
  });
  products.forEach((movie) => {
    addMovieToElement(movie, "full_movieslist");
    const storedID = getFromLocalStorage(movie.id);
    if (storedID) addMovieToCart(movie.id);
  });
  addCheckBoxes();
}

function addCheckBoxes() {
  const checkboxes_container = document.getElementById("checkboxes_container");
  if (!checkboxes_container) return;
  //Lager og legger til checkboxes
  genres.forEach((genre) => {
    const genreBox = document.createElement("div");
    const genreLabel = document.createElement("label");
    const genreInput = document.createElement("input");

    genreBox.classList.add("genre_box");
    genreLabel.htmlFor = "genre_" + genre;
    genreLabel.innerHTML = genre;
    genreInput.type = "checkbox";
    genreInput.id = "genre_" + genre;

    //skal lytte etter endring i checked
    genreInput.addEventListener("change", () => handleGenreChange(genre));

    genreBox.appendChild(genreInput);
    genreBox.appendChild(genreLabel);
    checkboxes_container.appendChild(genreBox);
  });
}

//sjekk at følgende også fungerer
function handleGenreChange(genre) {
  const isChecked = document.getElementById("genre_" + genre).checked;

  if (isChecked) {
    // legg til i selectedGenres arrayet hvis checked
    selectedGenres.push(genre);
  } else {
    // fjerne genre fra selectedGenres arrayet ihvis ikke checked/huket av
    const index = selectedGenres.indexOf(genre);
    if (index !== -1) {
      selectedGenres.splice(index, 1);
    }
  }
  updateMovieDisplays();
}


function updateMovieDisplays() {
  ///skal tømme/klargjøre full_movieslist container
  const movieSection = document.getElementById("full_movieslist");
  if (movieSection) {
    movieSection.innerHTML = "";
  }

 // filtrere og vise basert på checked
  const filteredMovies = products.filter((movie) =>
    selectedGenres.length === 0 ? true : selectedGenres.includes(movie.genre)
  );

  filteredMovies.forEach((movie) => {
    addMovieToElement(movie, "full_movieslist");
  });
}

// lager og legger til på elementene her
function addMovieToCart(movieID) {
  const checkout_container = document.getElementById("checkout_container");
  if (!checkout_container) return;
  const movie = products.find((item) => item.id === movieID);
  if (!movie) return;
  const movieElement = document.createElement("div");
  movieElement.classList.add("cart_movie");

  const poster = document.createElement("img");
  poster.classList.add("cart_movie_poster");
  poster.src = movie.image?.url;
  poster.alt = movie.image?.alt;

  const title = document.createElement("h3");
  title.textContent = movie.title;

  const price = document.createElement("p");
  price.textContent = `$${movie.price}`;

  movieElement.appendChild(poster);
  movieElement.appendChild(title);
  movieElement.appendChild(price);

  checkout_container.appendChild(movieElement);
}

//denne funksjonen legger filmer til på et gitt element når siden lastes
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
  const storedID = getFromLocalStorage(movie.id);
  if (storedID) cartbutt.classList.add("active");

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
    removeFromLocalStorage(movieID);
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

function removeFromLocalStorage(movieID) {
  try {
    localStorage.removeItem(movieID);
  } catch (e) {}
}

function getFromLocalStorage(movieID) {
  try {
    return localStorage.getItem(movieID);
  } catch (e) {}
}

window.addEventListener("DOMContentLoaded", function () {
  populateMovieDisplays();
  updateMovieDisplays();
});
