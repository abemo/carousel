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

function updateCarousel(direction) {
  Array.from(images).forEach((element) => {
    element.parentElement.classList.remove(
      "outside-left",
      "left",
      "center",
      "right",
      "outside-right",
      "animate-left",
      "animate-right"
    );
  });

  images[wrapIndex(imageIndex - 2)].parentElement.classList.add("outside-left");
  images[wrapIndex(imageIndex - 1)].parentElement.classList.add("left");
  images[wrapIndex(imageIndex)].parentElement.classList.add("center");
  images[wrapIndex(imageIndex + 1)].parentElement.classList.add("right");
  images[wrapIndex(imageIndex + 2)].parentElement.classList.add(
    "outside-right"
  );

  carouselImages = [
    images[wrapIndex(imageIndex - 2)],
    images[wrapIndex(imageIndex - 1)],
    images[wrapIndex(imageIndex)],
    images[wrapIndex(imageIndex + 1)],
    images[wrapIndex(imageIndex + 2)],
  ];

  if (direction) {
    carouselImages.forEach((img) => {
      const carouselItem = img.parentElement;
      carouselItem.classList.remove("animate-left", "animate-right");
      void carouselItem.offsetWidth;

      if (direction === "left") {
        carouselItem.classList.add("animate-left");
      } else if (direction === "right") {
        carouselItem.classList.add("animate-right");
      }
    });
  }

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

// ====================================================================
//                          Initialization
// ====================================================================

setInterval(applyAutoRotate, autoRotateInterval);
updateCarousel();
