function createNav(itemsNav) {
    const nav = document.createElement('nav');
    nav.className = 'nav';

    const ul = document.createElement('ul');
    ul.className = 'nav__list';

    itemsNav.forEach((item) => {
        const li = document.createElement('li');
        li.className = 'nav__item';

        const a = document.createElement('a');
        a.className = 'nav__link';
        a.href = item.href;
        a.textContent = item.name;

        li.appendChild(a);
        ul.appendChild(li);
    });

    nav.appendChild(ul);

    return nav;
}

export default createNav;
