import Slider from './slider.js';
import fetchJson from '../../servises/fetchJson.js';

const nextBtn = document.querySelector('.testimonials__next-btn');
const prevBtn = document.querySelector('.testimonials__prev-btn');

export function initTestimonialSlider() {
    fetchJson('js/json/testimonials.json')
        .then((images) => {
            if (images) {
                const slidesTestimonials = createCartTestimonials(images);

                const slider = new testimonialsSlider(
                    'testimonials-js',
                    slidesTestimonials,
                    2000,
                    nextBtn,
                    prevBtn
                );
                slider.init();
            }
        })
        .catch((err) => {
            console.log(err);
        });
}

function createCartTestimonials(elements) {
    const slides = [];

    elements.forEach((element) => {
        const containerContent = document.createElement('div');
        containerContent.className = 'testimonials__slide';

        containerContent.innerHTML = `
          <div class="testimonials__text">
            <p class="testimonials__quote">“${element.text}”</p>
            <div class="testimonials__author">
                <h3 class="testimonials__name">${element.name}</h3>
                <p class="testimonials__position">${element.position}</p>
            </div>
          </div>
          <div class="testimonials__image-wrapper">
            <img class="testimonials__img" src="${element.src}" alt="${element.name}">
          </div>
        `;

        slides.push(containerContent);
    });

    return slides;
}

function testimonialsSlider(containerId, slides, interval, btnNext, btnPrev) {
    this.btnNext = btnNext;
    this.btnPrev = btnPrev;

    Slider.call(this, containerId, slides, interval);

    const container = this.container;

    container.addEventListener('mouseenter', () => {
        this.stopAutoSlide();
    });

    container.addEventListener('mouseleave', () => {
        switch (this.lastSwipeDirection) {
            case 'next':
                this.startAutoSlide();
                break;
            case 'prev':
                this.startReversAutoSlide();
                break;
        }
    });

    this.startReversAutoSlide = function () {
        this.timer = setInterval(() => {
            this.prevSlide();
        }, this.slideInterval);
    };

    this.btnPrev.addEventListener('click', () => {
        this.btnPrev.disabled = true;
        setTimeout(() => {
            this.btnPrev.disabled = false;
        }, 1000);
        this.prevSlide();
        this.stopAutoSlide();
        this.startReversAutoSlide();
    });

    this.btnNext.addEventListener('click', () => {
        this.btnNext.disabled = true;
        setTimeout(() => {
            this.btnNext.disabled = false;
        }, 1000);
        this.nextSlide();
        this.stopAutoSlide();
        this.startAutoSlide();
    });

    let startX = 0;
    let isLocked = false;

    container.addEventListener('mousedown', (event) => {
        if (isLocked) return;
        startX = event.clientX;
    });

    container.addEventListener('mouseup', (event) => {
        if (isLocked || startX === 0) return;

        const diff = startX - event.clientX;
        const threshold = 150;
        startX = 0;

        if (Math.abs(diff) < threshold) return;

        isLocked = true;
        setTimeout(() => (isLocked = false), 1000);

        if (diff > 0) {
            this.stopAutoSlide();
            this.nextSlide();
            this.startAutoSlide();
        } else {
            this.stopAutoSlide();
            this.prevSlide();
            this.startReversAutoSlide();
        }
    });
}
