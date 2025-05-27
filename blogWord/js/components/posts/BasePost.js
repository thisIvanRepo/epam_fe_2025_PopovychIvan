import {
    CLASSNAMES,
    SVG_PATHS,
    ICON_SIZES,
    TEXTS_POSTS,
    STARS_COUNT,
} from '../../constants/blogConstants.js';
import formatDate from '../../servises/formatDate.js';
import normalizeRating from '../../servises/normalizeRating.js';

class BasePost {
    #genRating(rating) {
        const ratingBar = document.createElement('div');
        const stars = document.createElement('div');
        const fullStarsMask = document.createElement('div');

        ratingBar.classList.add(CLASSNAMES.ratingBar);
        stars.classList.add(CLASSNAMES.stars);
        fullStarsMask.classList.add(CLASSNAMES.stars, CLASSNAMES.starsFull);

        let percent = (normalizeRating(rating) / STARS_COUNT) * 100;

        fullStarsMask.style.width = `${percent}%`;

        for (let i = 1; i <= STARS_COUNT; i++) {
            const star = document.createElement('span');
            const fullStar = document.createElement('span');

            star.classList.add(CLASSNAMES.star);
            fullStar.classList.add(CLASSNAMES.star, CLASSNAMES.starFull);

            stars.append(star);
            fullStarsMask.append(fullStar);
        }

        stars.append(fullStarsMask);
        ratingBar.append(stars);

        return ratingBar;
    }

    #genTypeIcon(type) {
        return `
    <svg class="${CLASSNAMES.postIcon}" width="${ICON_SIZES.TYPE_ICON}" height="${ICON_SIZES.TYPE_ICON}">
      <use href="${SVG_PATHS.postIcons}#icon-${type}"></use>
    </svg>
  `;
    }

    #genReviewsIcon() {
        return `
  <span class="${CLASSNAMES.postReviews}">
    <svg class="${CLASSNAMES.iconReview}" width="${ICON_SIZES.REVIEW_ICON}" height="${ICON_SIZES.REVIEW_ICON}">
      <use href="${SVG_PATHS.postIcons}#icon-reviews"></use>
    </svg>
  </span>
`;
    }

    constructor(post) {
        this.post = post;
    }

    genAuthorInfo() {
        const { author, reviews, rating, date, readTime } = this.post;

        return `
            <div class="${CLASSNAMES.postHeader}">
              <img class="${CLASSNAMES.postAvatar}" src="${author.avatar}" alt="${author.name}">
              <div class="${CLASSNAMES.postMeta}">
                <h4 class="${CLASSNAMES.postName}">${author.name}</h4>
                <div class="${CLASSNAMES.postDetails}">
                  <p>
                    ${formatDate(date)} • ${readTime} 
                    min${readTime !== 1 ? 's' : ''} 
                    read • ${this.#genReviewsIcon()} ${reviews}
                  </p>
                  ${this.#genRating(rating).outerHTML}
                </div>
              </div>
            </div>
          `;
    }

    genTextBlock() {
        const { title, description } = this.post;

        return `
      <div class="${CLASSNAMES.postBody}">
        <h3 class="${CLASSNAMES.postTitle}">${title}</h3>
        <div class="${CLASSNAMES.postDescWraper}">
          <p class="${CLASSNAMES.postDesc}">${description}</p>
        </div>
      </div>
      <button class="${CLASSNAMES.btn} ${CLASSNAMES.postReadMore}">${TEXTS_POSTS.READ_MORE}</button>
    `;
    }

    genMediaBlock() {
        const { photo } = this.post;
        const photoContent = photo?.src
            ? `
              <div class="${CLASSNAMES.postMedia} ${CLASSNAMES.postMediaPhoto}">
            <img src="${photo.src}" alt="${TEXTS_POSTS.POST_PHOTO_ALT}">
          </div>
        `
            : '';

        return photoContent;
    }

    render() {
        const { type } = this.post;
        const container = document.createElement('div');
        container.classList.add(CLASSNAMES.blogPost);

        container.innerHTML = `
      <article class="${CLASSNAMES.post} post--${type}">
        ${this.genMediaBlock()}
        <div class="${CLASSNAMES.postContent}">
          ${this.#genTypeIcon(type)}
          ${this.genAuthorInfo()}
          ${this.genTextBlock()}
        </div>
      </article>
    `;

        return container;
    }
}

export default BasePost;
