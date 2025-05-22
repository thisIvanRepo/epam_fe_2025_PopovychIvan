import header from './baseComponents/header.js';
import createPost from './components/promisesPost/promisesPost.js';
import fetchJson from './servises/fetchJson.js';

// === variables===
const containerSelector = '.root-promises';
const jsonPath = '/blogWord/js/json/promisesPosts.json';
const progressAnimation = 'progress-decrease 3000ms linear forwards';
const link1Text = 'Progressbar 1';
const link2Text = 'Progressbar 2';
const linkClass = 'progress-link';
const linksWrapperClass = 'links-wraper';
const progressBarClass = 'progress-bar';
const progressFillClass = 'progress-fill';
const postsWrapperClass = 'wrapper-posts';
const postSelector = '.post';
const delayStep = 300;

// === functions helpers ===
const fetchPosts = async () => {
    const data = await fetchJson(jsonPath);
    return data;
};

const delayPost = (post, delay) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            post.style.opacity = '0';
            resolve();
        }, delay);
    });
};

const renderPosts = async () => {
    const dataPosts = await fetchPosts();
    const postsHTML = dataPosts.map(createPost).join('');

    const wrapperPosts = document.createElement('div');
    wrapperPosts.classList = postsWrapperClass;
    wrapperPosts.insertAdjacentHTML('beforeend', postsHTML);

    container.appendChild(wrapperPosts);
};

// === main ===

const container = document.querySelector(containerSelector);

// create links
const links = document.createElement('div');
links.className = linksWrapperClass;

const link1 = document.createElement('a');
link1.href = '#';
link1.textContent = link1Text;
link1.className = linkClass;

const link2 = document.createElement('a');
link2.href = '#';
link2.textContent = link2Text;
link2.className = linkClass;

links.appendChild(link1);
links.appendChild(link2);
container.appendChild(links);

// progress-bar
const progressBar = document.createElement('div');
const progressFill = document.createElement('div');
progressBar.className = progressBarClass;
progressFill.className = progressFillClass;
progressBar.appendChild(progressFill);
container.appendChild(progressBar);

progressFill.style.animation = 'none';

// rendering of posts
renderPosts();

// clicks
links.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target === links) return;

    // start animation
    progressFill.style.animation = 'none';
    progressFill.offsetWidth;
    progressFill.style.animation = progressAnimation;

    new Promise((resolve) => {
        progressFill.addEventListener('animationend', resolve, { once: true });
    }).then(() => {
        const posts = document.querySelectorAll(postSelector);

        if (e.target === link1) {
            posts.forEach((post) => {
                post.style.opacity = '0';
            });
        }

        if (e.target === link2) {
            let delay = 0;

            // Вирішив лишити варіант для розуміння того як працює ланцюжок.
            Promise.resolve()
                .then(
                    () =>
                        new Promise((res) => {
                            setTimeout(() => {
                                posts[0].style.opacity = '0';
                                res();
                            }, delay);
                            delay += delayStep;
                        })
                )
                .then(
                    () =>
                        new Promise((res) => {
                            setTimeout(() => {
                                posts[1].style.opacity = '0';
                                res();
                            }, delay);
                            delay += delayStep;
                        })
                )
                .then(
                    () =>
                        new Promise((res) => {
                            setTimeout(() => {
                                posts[2].style.opacity = '0';
                                res();
                            }, delay);
                            delay += delayStep;
                        })
                )
                .then(
                    () =>
                        new Promise((res) => {
                            setTimeout(() => {
                                posts[3].style.opacity = '0';
                                res();
                            }, delay);
                            delay += delayStep;
                        })
                );
            // let delayPromise = Promise.resolve();
            // let delay = 0;

            // posts.forEach((post) => {
            //     delayPromise = delayPromise.then(() => delayPost(post, delay));
            //     delay += delayStep;
            // });
        }
    });
});
