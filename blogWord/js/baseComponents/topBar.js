function createTopBar() {
    const topBar = document.createElement('div');
    topBar.classList = 'top-bar';

    return topBar;
}

function createLogo() {
    const link = document.createElement('a');
    link.href = '../../index.html';
    link.className = 'logo';
    link.textContent = 'BlogWorld';

    return link;
}

export { createTopBar, createLogo };
