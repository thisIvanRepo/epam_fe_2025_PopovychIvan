function createTitle(nameSection) {
    if (!nameSection) {
        console.log('Please provide text for the section title.');
        return null;
    }

    const title = document.createElement('h2');
    title.classList.add('section__title');
    title.textContent = nameSection;

    return title;
}

export default createTitle;
