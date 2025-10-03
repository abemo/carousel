// ====================================================================
//                          Global Variables
// ====================================================================

const carouselContent = document.getElementById("carousel-content");
const images = carouselContent.getElementsByTagName("img");
let totalImages = images.length;

const prevBtn = document.getElementById("prevBtn");
const playPauseBtn = document.getElementById("playPauseBtn");
const nextBtn = document.getElementById("nextBtn");
let indicators = document.getElementById("indicators");

let imageIndex = 0;
let autoRotate = false;
const autoRotateInterval = 5000;
let soundOn = false;
const swipeThreshold = 50;

const playSymbol = "&#x23F5;";
const pauseSymbol = "&#x23F8;";
const emptyCircleSymbol = "&#9675;";
const filledCircleSymbol = "&#9679;";
const speakerIcon = "&#128263;";
const crossedSpeakerIcon = "&#128266;";

// ====================================================================
//                          Helper Functions
// ====================================================================

function wrapIndex(index) {
  return (index + totalImages) % totalImages;
}

function incrementImageIndex() {
  imageIndex = wrapIndex(imageIndex + 1);
}

function decrementImageIndex() {
  imageIndex = wrapIndex(imageIndex - 1);
}

// ====================================================================
//                          Button Controls
// ====================================================================

prevBtn.addEventListener("click", () => {
  decrementImageIndex();
  updateCarousel((direction = "right"));
});

nextBtn.addEventListener("click", () => {
  incrementImageIndex();
  updateCarousel((direction = "left"));
});

playPauseBtn.addEventListener("click", () => {
  playPauseBtn.innerHTML = autoRotate ? playSymbol : pauseSymbol;
  autoRotate = !autoRotate;
});

// ====================================================================
//                          Touch Screen Controls
// ====================================================================

let startX = 0;
let endX = 0;

carouselContent.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

carouselContent.addEventListener("touchmove", (e) => {
  endX = e.touches[0].clientX;
});

carouselContent.addEventListener("touchend", () => {
  const distance = endX - startX;

  if (Math.abs(distance) > swipeThreshold) {
    if (distance < 0) {
      incrementImageIndex();
      updateCarousel((direction = "left"));
    } else {
      decrementImageIndex();
      updateCarousel((direction = "right"));
    }
  }
  startX = 0;
  endX = 0;
});

// ====================================================================
//                          Carousel Updates
// ====================================================================

function updateIndicators(imageIndex) {
  updatedIndicators = Array(totalImages).fill(emptyCircleSymbol);
  updatedIndicators[imageIndex] = filledCircleSymbol;
  indicators.innerHTML = updatedIndicators.join("");
}

function animateTransition(
  direction,
  leftImgIndex,
  centerImgIndex,
  rightImgIndex
) {
  let nextImage =
    direction === "left"
      ? images[wrapIndex(imageIndex + 1)]
      : images[wrapIndex(imageIndex - 1)];

  // if carousel is moving left, next image comes from right
  // left image goes off screen to left
  // center image moves to left
  // right image moves to center
  // next image moves from off screen right to right

  // if carousel is moving right, next image comes from left
  // right image goes off screen to right
  // center image moves to right
  // left image moves to center
  // next image moves from off screen left to left
}

function updateCarousel(direction) {
  const leftImgIndex = wrapIndex(imageIndex - 1);
  const centerImgIndex = wrapIndex(imageIndex);
  const rightImgIndex = wrapIndex(imageIndex + 1);

  Array.from(images).forEach((element) => {
    element.parentElement.classList.remove("left", "center", "right");
  });

  images[leftImgIndex].parentElement.classList.add("left");
  images[centerImgIndex].parentElement.classList.add("center");
  images[rightImgIndex].parentElement.classList.add("right");

  if (direction)
    animateTransition(direction, leftImgIndex, centerImgIndex, rightImgIndex);

  updateIndicators(imageIndex);

  pauseAllAudio();
  if (soundOn) setCurrentAudioState(imageIndex);
}

// ====================================================================
//                          Auto Rotate
// ====================================================================

function applyAutoRotate() {
  if (autoRotate) {
    incrementImageIndex();
    updateCarousel((direction = "left"));
  }
}

setInterval(applyAutoRotate, autoRotateInterval);

updateCarousel();

// ====================================================================
//                          Sound Controls
// ====================================================================
const soundToggleBtn = document.getElementById("soundToggleBtn");

function pauseAllAudio() {
  const allAudios = document.querySelectorAll(".carousel-item audio");
  allAudios.forEach((audio) => {
    audio.pause();
    audio.currentTime = 0;
  });
}

function setCurrentAudioState(imageIndex) {
  const currentAudio = images[imageIndex].parentElement.querySelector("audio");

  if (soundOn) {
    currentAudio.play();
  } else {
    currentAudio.pause();
  }
}

soundToggleBtn.addEventListener("click", () => {
  soundOn = !soundOn;
  soundToggleBtn.innerHTML = soundOn ? speakerIcon : crossedSpeakerIcon;

  pauseAllAudio();
  setCurrentAudioState(imageIndex);
});
