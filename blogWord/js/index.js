import header from './baseComponents/header.js';
import { initTestimonialSlider } from './components/slider/testimonialsSlider.js';
import { initMap } from './components/googleMap/googleMap.js';

initTestimonialSlider();

document.addEventListener('DOMContentLoaded', () => {
    const placeholder = document.getElementById('map-placeholder');
    const mapDiv = document.getElementById('map');

    const observer = new IntersectionObserver(
        (entries, obs) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    placeholder.style.display = 'none';
                    mapDiv.style.display = 'block';

                    initMap();
                    obs.unobserve(placeholder);
                }
            });
        },
        { threshold: 0.1 }
    );

    if (placeholder) {
        observer.observe(placeholder);
    }
});
