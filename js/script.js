const products = [];
const genres = [];
const selectedGenres = [];
let totalSum = 0;

// Henter alle filmer og returnerer en liste av dem
async function getAllProducts() {
  try {
    const api = `https://v2.api.noroff.dev/square-eyes`;
    const response = await fetch(api);
    //console.log(api);
    if (!response.ok) throw new Error(`HTTP error! ${response.status}`);
    const obj = await response.json();
    //console.log(obj);
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
    //console.log(movie.description);

  });
  addCheckBoxes();
  }

async function populateSingleProduct() {
  const productsResponse = await getAllProducts();
  if (!productsResponse) return;

   products.forEach((movie) => {
    //console.log(movie.description);
    const Descri = movie
    console.log(Descri);
    
    const itemvar = document.getElementById("productitem");
    if (!itemvar) return;
    itemvar.innerHTML=`

    
    <h1>${Descri.title}</h1>
        <div id="productitem_info">
          <img
            src="${Descri.image.url}"
            alt="${Descri.image.alt}"
          />
          <p id="proditem_description" >
          ${Descri.description}
          </p>
          <div id="productitem_metadata">
            <p></i>Price: $ ${movie.price}</p>
            
        </div>
        <br />
        <a id="cartbutton" class="button" href="cart.html">Add to cart</a>
      </div>
    `;
    
   })}



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

//sjekker om checkbox er checked
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

  cartbutt.onclick = (e) => toggleCartChange(e, movie);
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

function toggleCartChange(event, movie) {
  const active = event.currentTarget.classList.contains("active");
  if (active) {
    event.currentTarget.classList.remove("active");
    removeFromLocalStorage(movie.id);
    totalSum -= parseInt(movie.price);
  } else {
    event.currentTarget.classList.add("active");
    saveToLocalStorage(movie);
    totalSum += parseFloat(movie.price)
  }
  try {
    localStorage.setItem("totalsum", totalSum);
  } catch (e) {}
}

function saveToLocalStorage(movie) {
  try {
    localStorage.setItem(movie.id, movie.price);
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
  populateSingleProduct()
});
