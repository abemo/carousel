let imageIndex = 0;

const carouselContent = document.getElementById("carousel-content");
const images = carouselContent.getElementsByTagName("img");

let totalImages = images.length;

const prevBtn = document.getElementById("prevBtn");
const playPauseBtn = document.getElementById("playPauseBtn");
const nextBtn = document.getElementById("nextBtn");

let indicators = document.getElementById("indicators");

function incrementImageIndex() {
  imageIndex = (imageIndex + 1) % totalImages;
}

function decrementImageIndex() {
  imageIndex = (imageIndex - 1 + totalImages) % totalImages;
}

prevBtn.addEventListener("click", () => {
  decrementImageIndex();
  updateCarousel();
});

nextBtn.addEventListener("click", () => {
  incrementImageIndex();
  updateCarousel();
});

let autoRotate = false;
playPauseBtn.addEventListener("click", () => {
  if (autoRotate) {
    playPauseBtn.innerHTML = "&#x23F5;"; // Change to play icon
  } else {
    playPauseBtn.innerHTML = "&#x23F8;"; // Change to pause icon
  }
  autoRotate = !autoRotate;
});

function updateCarousel() {
  const leftImgIndex = imageIndex - 1 >= 0 ? imageIndex - 1 : totalImages - 1;
  const centerImgIndex = imageIndex;
  const rightImgIndex = (imageIndex + 1) % totalImages;

  Array.from(images).forEach((element) => {
    element.parentElement.classList.remove("left", "center", "right");
  });

  images[leftImgIndex].parentElement.classList.add("left");
  images[centerImgIndex].parentElement.classList.add("center");
  images[rightImgIndex].parentElement.classList.add("right");

  updatedIndicators = Array(totalImages).fill("&#9675;");
  updatedIndicators[imageIndex] = "&#9679;";
  indicators.innerHTML = updatedIndicators.join("");
}

function applyAutoRotate() {
  if (autoRotate) {
    incrementImageIndex();
    updateCarousel();
  }
}

const autoRotateInterval = 5000;
setInterval(applyAutoRotate, autoRotateInterval);

updateCarousel();
