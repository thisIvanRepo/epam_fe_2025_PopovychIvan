// import createContainer from '../baseComponents/container.js';
import { createTopBar, createLogo } from './topBar.js';
import createNav from './nav.js';
import fetchJson from '../servises/fetchJson.js';

const header = document.querySelector('.header');

const container = document.querySelector('.container__header');
// const container = createContainer();
// container.classList.add('container__header');

const topBar = createTopBar();
const logo = createLogo();
logo.classList.add('logo__header');
topBar.appendChild(logo);

fetchJson('js/json/navItems.json')
    .then((navData) => {
        if (navData) {
            const nav = createNav(navData);
            topBar.appendChild(nav);
        }
    })
    .catch((err) => {
        console.error(`Error loading nav data: ${err}`);
    });

container.appendChild(topBar);
header.appendChild(container);

// export default createHeader;
export default header;
