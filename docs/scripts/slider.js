function initImageSlider(sliderContainer) {
    const list = sliderContainer.querySelector('.list');
    const slides = sliderContainer.querySelectorAll('.slide');
    const images = sliderContainer.querySelectorAll('.slide img');
    const prevButton = sliderContainer.querySelector('#prev');
    const nextButton = sliderContainer.querySelector('#next');
    const dotsContainer = sliderContainer.querySelector('.dots');

    let currentIndex = 0;
    const gap = 20; // Gap between slides
    const slidesCount = slides.length;

    let slideWidth;

    function normalizeIndex(index) {
        if (index < 0) return slidesCount - 1;
        if (index >= slidesCount) return 0;
        return index;
    }

    // Create dots
    images.forEach((_, index) => {
        const dot = document.createElement('li');
        dot.classList.add('box-shadow');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => showSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll('li');

    function showSlide(index) {
        slideWidth = slides[0].offsetWidth;
        // console.log(slideWidth)

        dots[currentIndex].classList.remove('active');
        images[currentIndex].classList.remove("active");

        currentIndex = normalizeIndex(index);

        dots[currentIndex].classList.add('active');
        images[currentIndex].classList.add("active");

        const offset = -(currentIndex * (slideWidth + gap));
        list.style.transform = `translateX(${offset}px)`;
    }

    nextButton.addEventListener('click', (e) => {
        e.preventDefault();
        showSlide(currentIndex + 1);
    });

    prevButton.addEventListener('click', (e) => {
        e.preventDefault();
        showSlide(currentIndex - 1);
    });

    window.addEventListener('resize', () => {
        showSlide(currentIndex);
    });

    showSlide(0);
}

export { initImageSlider };