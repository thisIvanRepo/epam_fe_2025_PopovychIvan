// Пам'ятаю що трибавнести цей файли в baseComponents

function Slider(containerId, slides, slideInterval) {
    this.container = document.getElementById(containerId);
    this.slides = slides || [];
    this.slideInterval = slideInterval || 1500;
    this.currentIndex = 1;
    this.slideElement = null;
    this.timer = null;
    this.lastSwipeDirection = 'next';

    this.init = function () {
        this.slideElement = document.createElement('div');
        this.slideElement.className = 'slider-carusel';

        const lastClone = this.slides[this.slides.length - 1].cloneNode(true);
        this.slideElement.appendChild(lastClone);

        this.slides.forEach((item) => {
            this.slideElement.appendChild(item);
        });

        const firstClone = this.slides[0].cloneNode(true);
        this.slideElement.appendChild(firstClone);

        this.container.appendChild(this.slideElement);

        this.updateSlidePosition();

        this.startAutoSlide();

        window.addEventListener('resize', () => this.handleResize());
    };

    this.updateSlidePosition = function () {
        const slideWidth = this.container.clientWidth;
        this.slideElement.style.transform = `translateX(-${this.currentIndex * slideWidth}px)`;
    };

    this.nextSlide = function () {
        this.currentIndex++;
        this.lastSwipeDirection = 'next';
        this.updateSlidePosition();

        if (this.currentIndex >= this.slides.length + 1) {
            setTimeout(() => {
                this.slideElement.style.transition = 'none';
                this.currentIndex = 1;
                this.updateSlidePosition();

                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        this.slideElement.style.transition = `transform 1s ease`;
                    });
                });
            }, 1000);
        }
    };

    this.prevSlide = function () {
        this.currentIndex--;
        this.lastSwipeDirection = 'prev';
        this.updateSlidePosition();

        if (this.currentIndex <= 0) {
            setTimeout(() => {
                this.slideElement.style.transition = 'none';
                this.currentIndex = this.slides.length;
                this.updateSlidePosition();

                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        this.slideElement.style.transition =
                            'transform 1s ease';
                    });
                });
            }, 1000);
        }
    };

    this.startAutoSlide = function () {
        this.timer = setInterval(() => {
            this.nextSlide();
        }, this.slideInterval);
    };

    this.stopAutoSlide = function () {
        clearInterval(this.timer);
    };

    this.handleResize = function () {
        this.updateSlidePosition();
    };
}

export default Slider;

// import observer from '../../api/observer.js';

// function Slider(data, container, content, nextBtn, prevBtn, startIndex = 0) {
//     this.container = container;
//     this.content = content;
//     this.nextBtn = nextBtn;
//     this.prevBtn = prevBtn;
//     this.data = data;
//     this.currentIndex = startIndex;
//     this.slideElements = [];

//     const slideWidth = content.clientWidth;
//     Object.assign(content.style, {
//         width: `${slideWidth * 3}px`,
//         height: `${slideWidth}px`,
//     });

//     const createSlide = (index) => {
//         const wrapper = document.createElement('div');
//         wrapper.classList.add('slide-wrapper');
//         wrapper.innerHTML = `<img src="${this.data[index].image}" alt="${this.data[index].description}">`;
//         return wrapper;
//     };

//     const addSlide = (index, toStart = false) => {
//         const slide = createSlide(index);
//         toStart ? this.content.prepend(slide) : this.content.append(slide);
//         toStart ? this.slideElements.unshift(slide) : this.slideElements.push(slide);
//     };

//     this.renderPrev = () =>
//         addSlide((this.currentIndex - 1 + this.data.length) % this.data.length, true);

//     this.renderNext = () =>
//         addSlide((this.currentIndex + 1) % this.data.length);

//     this.initSlider = () => {
//         this.renderPrev();
//         addSlide(this.currentIndex);
//         this.renderNext();
//         this.attachControls();
//     };

//     this.attachControls = () => {
//         this.nextBtn?.addEventListener('click', () => {
//             this.currentIndex = (this.currentIndex + 1) % this.data.length;
//             this.slideElements.shift().remove();
//             this.renderNext();
//         });

//         this.prevBtn?.addEventListener('click', () => {
//             this.currentIndex = (this.currentIndex - 1 + this.data.length) % this.data.length;
//             this.slideElements.pop().remove();
//             this.renderPrev();
//         });
//     };
// }

// --- start region working wersion
// function Slider(data, container, content, nextBtn, prevBtn, startIndex = 0) {
//     this.content = content;
//     this.container = container;
//     this.nextBtn = nextBtn;
//     this.prevBtn = prevBtn;
//     this.data = data;
//     this.startIndex = startIndex;
//     this.renderCollection = [];

//     const widthOffset = content.clientWidth;
//     content.style.width = 3 * widthOffset + 'px';
//     content.style.height = widthOffset + 'px';

//         const animation = ({duration, draw, removeElement}) => {
//         const start = performance.now();

//         requestAnimationFrame(function animate(time){
//             let step = (time - start) / duration;

//             if(step > 1) step = 1;

//             draw(step);
//             if(step < 1) {
//                 requestAnimationFrame(animate);
//             } else { removeElement.remove(); }
//         });
//     }

//     this.initSlider = () => {
//         this.prev();

//         const containerImg = document.createElement('div');
//         containerImg.className = 'slide-wrapper';

//         const img = document.createElement('img');
//         img.alt = this.data[this.startIndex].description;
//         img.src = this.data[this.startIndex].image;
//         containerImg.append(img);

//         this.renderCollection.push(containerImg);
//         this.content.append(containerImg);

//         this.next();

//         this.nextSlider();
//         this.prevSlider();
//         console.dir(this.renderCollection);
//     };

//     this.nextSlider = () => {
//         if (this.nextBtn) {
//             this.nextBtn.addEventListener('click', () => {
//                 this.startIndex++;
//                 if (this.startIndex >= this.data.length) this.startIndex = 0;

//                 let nextIndex = this.startIndex + 1;
//                 if (nextIndex >= this.data.length) nextIndex = 0;

//                 // Створюємо новий слайд з нульовою шириною
//                 const containerImg = document.createElement('div');
//                 containerImg.className = 'slide-wrapper';
//                 containerImg.style.width = '0px'; // початок з 0 ширини

//                 const img = document.createElement('img');
//                 img.alt = this.data[nextIndex].description;
//                 img.src = this.data[nextIndex].image;
//                 containerImg.append(img);

//                 // Додаємо праворуч
//                 this.renderCollection.push(containerImg);
//                 this.content.append(containerImg);

//                 // Анімація збільшення ширини нового слайда
//                 animation({
//                     duration: 500,
//                     draw: function(progress) {
//                         containerImg.style.width = (widthOffset * progress) + 'px';
//                     },
//                     // removeElement: { remove: () => {} } // не видаляємо новий елемент
//                 });

//                 // Видаляємо перший слайд (лівий)
//                 const old = this.renderCollection.shift();
//                 animation({
//                     duration: 500,
//                     draw: function(progress) {
//                         old.style.width = (widthOffset * (1 - progress)) + 'px';
//                     },
//                     removeElement: old
//                 });
//             });
//         }
//     };

//     this.prevSlider = () => {
//         if (this.prevBtn) {
//             this.prevBtn.addEventListener('click', () => {
//                 this.startIndex--;
//                 if (this.startIndex < 0) this.startIndex = this.data.length - 1;

//                 // Додаємо новий слайд справа (з шириною 0px)
//                 let prevIndex = this.startIndex - 1;
//                 if (prevIndex < 0) prevIndex = this.data.length - 1;

//                 const containerImg = document.createElement('div');
//                 containerImg.className = 'slide-wrapper';
//                 containerImg.style.width = '0px'; // стартова ширина

//                 const img = document.createElement('img');
//                 img.alt = this.data[prevIndex].description;
//                 img.src = this.data[prevIndex].image;
//                 containerImg.append(img);

//                 this.renderCollection.unshift(containerImg);
//                 this.content.prepend(containerImg);

//                 // Анімація збільшення ширини нового слайда
//                 animation({
//                     duration: 500,
//                     draw: function(progress) {
//                         containerImg.style.width = (widthOffset * progress) + 'px';
//                     },
//                     // removeElement: { remove: () => {} } // НЕ видаляємо новий елемент
//                 });

//                 // Видаляємо старий правий слайд
//                 const old = this.renderCollection.pop();
//                 animation({
//                     duration: 500,
//                     draw: function(progress) {
//                         old.style.width = (widthOffset * (1 - progress)) + 'px';
//                     },
//                     removeElement: old
//                 });
//             });
//         }
//     };

//     this.next = () => {
//         let nextIndex = this.startIndex + 1;
//         if (nextIndex >= this.data.length) nextIndex = 0;

//         const containerImg = document.createElement('div');
//         containerImg.className = 'slide-wrapper';

//         const img = document.createElement('img');
//         img.alt = this.data[nextIndex].description;
//         img.src = this.data[nextIndex].image;
//         containerImg.append(img);

//         this.renderCollection.push(containerImg);
//         this.content.append(containerImg);
//     };

//     this.prev = () => {
//         let prevIndex = this.startIndex - 1;
//         if (prevIndex < 0) prevIndex = this.data.length - 1;

//         const containerImg = document.createElement('div');
//         containerImg.className = 'slide-wrapper';

//         const img = document.createElement('img');
//         img.alt = this.data[prevIndex].description;
//         img.src = this.data[prevIndex].image;
//         containerImg.append(img);

//         this.renderCollection.unshift(containerImg);
//         // if (width) container.style.width = 0;
//         this.content.prepend(containerImg);
//     };
// }

//------ end region working wersion

// this.container = container;
// this.data = data || [];
// this.nextBtn = nextBtn;
// this.prevBtn = prevBtn;
// // this.currentIndex = 0;
// this.interval = null;

// this.init = function () {
//     const isBtn = this.nextBtn && this.prevBtn;

//     if (isBtn) {
//         this.nextBtn.addEventListener('click', () => {
//             this.next();
//         });

//         this.prevBtn.addEventListener('click', () => {
//             this.prev();
//         });
//     }

//     this.container.addEventListener('mouseenter', (event) =>
//         this.stopSlider()
//     );
//     this.container.addEventListener('mouseleave', (event) =>
//         this.startSlider()
//     );

//     observer.observe(this.container);
//     this.render();
//     this.startSlider();
// };

// this.next = function () {
//     this.currentIndex = (this.currentIndex + 1) % this.data.length;
//     this.render();
// };

// this.prev = function () {
//     this.currentIndex =
//         (this.currentIndex - 1 + this.data.length) % this.data.length;
//     this.render();
// };

// this.startSlider = function (delay = 2500) {
//     if (this.interval) return;

//     this.interval = setInterval(() => this.next(), delay);
// };

// this.stopSlider = function () {
//     clearInterval(this.interval);
//     this.interval = null;
// };

// this.render = function () {
//     console.log('You mast implement method render');
// };
// }

// export default Slider;
