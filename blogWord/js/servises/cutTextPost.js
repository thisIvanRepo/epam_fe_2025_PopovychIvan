function cutText(wrapper, content) {
    const wrapperHeight = wrapper.clientHeight;
    const originalText = content.textContent.trim().split(' ');

    let low = 0;
    let high = originalText.length;
    let trimmed = content.textContent.trim();

    if (content.clientHeight <= wrapperHeight) {
        return trimmed;
    }

    while (low < high) {
        let mid = Math.floor((low + high) / 2);
        content.textContent =
            originalText.slice(0, mid).join(' ').trim() + '...';

        if (content.clientHeight > wrapperHeight) {
            high = mid - 1;
        } else {
            trimmed = content.textContent;
            low = mid + 1;
        }
    }

    return trimmed;
}

export default cutText;
