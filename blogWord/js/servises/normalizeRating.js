function normalizeRating(number) {
    const rating = Number(number);

    if (isNaN(rating) || rating < 0) {
        return 0;
    }
    if (rating > 5) {
        return 5;
    }

    return rating;
}

export default normalizeRating;
