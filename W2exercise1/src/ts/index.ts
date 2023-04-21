let slideIndex: number = 0;

function nextSlide() {
    slideIndex++;
    if (slideIndex >= document.getElementsByClassName("banner__item").length) {
        slideIndex = 0;
    }
    updateCarousel();
}

function updateCarousel() {
    let carouselInner = Array.from(
        document.getElementsByClassName(
            "banner__list"
        ) as HTMLCollectionOf<HTMLElement>
    )[0];
    carouselInner.style.transform = `translateX(-${slideIndex * 50}%)`;
}

// Set initial slide
updateCarousel();

setInterval(nextSlide, 3000);
