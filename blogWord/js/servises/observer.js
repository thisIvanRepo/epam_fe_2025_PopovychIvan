const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            const slider = entry.target.sliderInstance;
            if (!slider) return;

            if (entry.isIntersecting) {
                slider.startSlider();
            } else {
                slider.stopSlider();
            }
        });
    },
    { threshold: 0.2 }
);

export default observer;
