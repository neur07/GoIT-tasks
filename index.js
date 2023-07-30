// Set the API Key
const API_KEY = "38540758-0a2374cd423a36a545bd48cad";

// DOM Elements
const form = document.getElementById("search-form");
const input = form.querySelector("input");
const imgList = document.querySelector("ul");

// Event listeners
input.addEventListener("input", newSearch);

// Lazy Loading
const options = {
  root: null,
  rootMargin: "240px",
  threshold: 0.5,
};

const observer = new IntersectionObserver(handleIntersection, options);

async function handleIntersection(entries) {
  const lastImg = entries[0];
  if (!lastImg.isIntersecting) return;
  await fetchImg();
  observer.unobserve(lastImg.target);
}

let currentPage = 1;
let currentSearch = "";
let isLoading = false;

// Loading Images

function removeResults() {
  let lastChild = imgList.lastElementChild;
  while (lastChild) {
    imgList.removeChild(lastChild);
    lastChild = imgList.lastElementChild;
  }
}

function newSearch(el) {
  removeResults();
  currentPage = 1;
  currentSearch = el.target.value;
  fetchImg();
}

async function fetchImg() {
  if (!currentSearch || isLoading) return;
  isLoading = true;
  const URL = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(
    currentSearch
  )}&page=${currentPage}`;
  const response = await fetch(URL);
  const images = await response.json();
  images.hits.forEach((image) =>
    renderImage({
      alt: image.tags,
      webformatURL: image.webformatURL,
      largeImageURL: image.largeImageURL,
    })
  );
  isLoading = false;
  const lastLi = imgList.querySelector("li:last-of-type");
  observer.observe(lastLi);
  currentPage++;
}

function renderImage(image) {
  const li = document.createElement("li");
  const a = document.createElement("a");
  const img = document.createElement("img");
  img.src = image.webformatURL;
  img["data-source"] = image.largeImageURL;
  img.alt = a.href = image.largeImageURL;
  a.appendChild(img);
  li.appendChild(a);
  imgList.appendChild(li);
  li.addEventListener("click", (event) => {
    event.preventDefault();
    openModal(image.largeImageURL);
  });
}

// Modal

function openModal(largeImageURL) {
  const instance = basicLightbox.create(
    `<img src="${largeImageURL}" alt="Larger Image">`
  );
  instance.show();
}
