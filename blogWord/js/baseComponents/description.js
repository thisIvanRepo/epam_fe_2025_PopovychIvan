function createDescription(text) {
    if (!text) {
        console.warn('Please provide text for the section description.');
        return null;
    }

    const paragraph = document.createElement('p');
    paragraph.classList.add('section__content');
    paragraph.textContent = text;

    return paragraph;
}

export default createDescription;
