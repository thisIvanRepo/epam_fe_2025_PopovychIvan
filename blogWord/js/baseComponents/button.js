function createButton(content = 'btn', variant = 'light', size = 'md') {
    const btn = document.createElement('button');
    btn.classList.add('btn', `btn--${variant}`, `btn--${size}`);

    btn.textContent = content;

    return btn;
}

export default createButton;
