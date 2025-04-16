import Slider from './slider.js';

function PortfolioSlider(
    data,
    container,
    sliderContent,
    nextBtn,
    prevBtn,
    startIndex
) {
    Slider.call(
        this,
        data,
        container,
        sliderContent,
        nextBtn,
        prevBtn,
        startIndex
    );
}

export default PortfolioSlider;
