const slides = Array.from(document.querySelectorAll(".slide"));
const indicators = Array.from(document.querySelectorAll(".indicator"));
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentIndex = 0;

function updateView() {
  slides.forEach((slide, index) => {
    const isActive = index === currentIndex;
    slide.classList.toggle("is-active", isActive);
    slide.setAttribute("aria-hidden", String(!isActive));
  });

  indicators.forEach((dot, index) => {
    const isActive = index === currentIndex;
    dot.classList.toggle("is-active", isActive);
    dot.setAttribute("aria-selected", String(isActive));
    dot.tabIndex = isActive ? 0 : -1;
  });

  prevBtn.disabled = currentIndex === 0;
  nextBtn.textContent = currentIndex === slides.length - 1 ? "进入首页" : "下一步";
}

function goTo(index) {
  currentIndex = Math.max(0, Math.min(slides.length - 1, index));
  updateView();
}

prevBtn.addEventListener("click", () => {
  goTo(currentIndex - 1);
});

nextBtn.addEventListener("click", () => {
  if (currentIndex === slides.length - 1) {
    window.location.href = "./home.html";
    return;
  }
  goTo(currentIndex + 1);
});

indicators.forEach((dot) => {
  dot.addEventListener("click", () => {
    const index = Number(dot.dataset.index || 0);
    goTo(index);
  });
});

window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") {
    goTo(currentIndex + 1);
  }
  if (event.key === "ArrowLeft") {
    goTo(currentIndex - 1);
  }
});

updateView();
