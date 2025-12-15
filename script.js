document.querySelector(".icon-menu").addEventListener("click", function (event) {
  event.preventDefault();
  document.body.classList.toggle("menu-open");
});

const spollerButtons = document.querySelectorAll("[data-spoller] .spollers-faq__button");

spollerButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const currentItem = button.closest("[data-spoller]");
    const content = currentItem.querySelector(".spollers-faq__text");

    const parent = currentItem.parentNode;
    const isOneSpoller = parent.hasAttribute("data-one-spoller");

    if (isOneSpoller) {
      const allItems = parent.querySelectorAll("[data-spoller]");
      allItems.forEach((item) => {
        if (item !== currentItem) {
          const otherContent = item.querySelector(".spollers-faq__text");
          item.classList.remove("active");
          otherContent.style.maxHeight = null;
        }
      });
    }

    if (currentItem.classList.contains("active")) {
      currentItem.classList.remove("active");
      content.style.maxHeight = null;
    } else {
      currentItem.classList.add("active");
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
});

// Reviews Slider
const reviewsSlider = document.querySelector(".reviews__slider");
const reviewsRow = document.querySelector(".reviews__row");
const prevBtn = document.querySelector(".reviews__slider-btn--prev");
const nextBtn = document.querySelector(".reviews__slider-btn--next");

if (reviewsSlider && reviewsRow && prevBtn && nextBtn) {
  let currentIndex = 0;
  const reviewsColumns = reviewsRow.querySelectorAll(".reviews__column");
  const totalReviews = reviewsColumns.length;
  
  // Calculate how many reviews to show based on screen width
  function getReviewsPerSlide() {
    if (window.innerWidth <= 530) return 1;
    if (window.innerWidth <= 992) return 2;
    return 3; // Show 3 reviews per slide on desktop
  }
  
  let reviewsPerSlide = getReviewsPerSlide();
  const maxIndex = totalReviews - reviewsPerSlide;

  function updateSlider() {
    reviewsPerSlide = getReviewsPerSlide();
    
    // Calculate translateX based on the width of one review column
    // Each review takes (100% - gaps) / reviewsPerSlide of the container
    const sliderWidth = reviewsSlider.offsetWidth;
    const gap = 24; // column-gap in pixels
    const reviewWidth = (sliderWidth - (gap * (reviewsPerSlide - 1))) / reviewsPerSlide;
    const translateX = -currentIndex * (reviewWidth + gap);
    
    reviewsRow.style.transform = `translateX(${translateX}px)`;
    
    // Buttons are always enabled for cycling
    prevBtn.style.opacity = "1";
    prevBtn.style.cursor = "pointer";
    nextBtn.style.opacity = "1";
    nextBtn.style.cursor = "pointer";
  }

  prevBtn.addEventListener("click", () => {
    // Cycle: if at first slide, go to last slide
    if (currentIndex === 0) {
      currentIndex = maxIndex;
    } else {
      currentIndex--;
    }
    updateSlider();
  });

  nextBtn.addEventListener("click", () => {
    // Cycle: if at last slide, go to first slide
    if (currentIndex >= maxIndex) {
      currentIndex = 0;
    } else {
      currentIndex++;
    }
    updateSlider();
  });

  // Initialize slider
  updateSlider();

  // Handle window resize
  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      updateSlider();
    }, 250);
  });
}