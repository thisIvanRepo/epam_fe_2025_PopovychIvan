// import createContainer from '../baseComponents/container.js';
import { createTopBar, createLogo } from './topBar.js';
import createNav from './nav.js';
import fetchJson from '../servises/fetchJson.js';
import initAutocomplete from '../servises/initAutocomplete.js';

const header = document.querySelector('.header');

const container = document.querySelector('.container__header');
// const container = createContainer();
// container.classList.add('container__header');

const topBar = createTopBar();
const logo = createLogo();
logo.classList.add('logo__header');
topBar.appendChild(logo);

const labelHeader = document.createElement('label');
labelHeader.setAttribute('for', 'header-search');
labelHeader.classList.add('label__header');

const inputHeader = document.createElement('input');
inputHeader.type = 'text';
inputHeader.id = 'header-search';
inputHeader.placeholder = 'City to search...';
inputHeader.classList.add('input__header');

labelHeader.appendChild(inputHeader);
topBar.appendChild(labelHeader);

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

// Enable authocomplite
(async () => {
    try {
        await initAutocomplete(inputHeader);
    } catch (error) {
        console.log(`Problem with authocomlite: ${error}`);
    }
})();

// export default createHeader;
export default header;
