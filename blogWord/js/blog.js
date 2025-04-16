import header from './baseComponents/header.js';
import fetchJson from './servises/fetchJson.js';
import { CLASSNAMES, SVG_PATHS } from './constants/blogConstants.js';

const containerPosts = document.getElementById('blog-posts');

// Render Elements

function renderPost(post) {
    const container = document.createElement('div');
    container.classList.add(CLASSNAMES.blogPost);
    container.innerHTML = generatePost(post);
    return container;
}

function generateStars(rating) {
    const fullStars = Math.round(rating);
    let starsHtml = '';

    for (let i = 1; i <= 5; i++) {
        const isFilled = i <= fullStars;
        starsHtml += `
      <span class="${CLASSNAMES.star}${isFilled ? ` ${CLASSNAMES.starFull}` : ''}"></span>
    `;
    }

    return `<div class="${CLASSNAMES.stars}">${starsHtml}</div>`;
}

function getTypeIcon(type) {
    return `
    <svg class="${CLASSNAMES.postIcon}" width="66" height="66">
      <use href="${SVG_PATHS.postIcons}#icon-${type}"></use>
    </svg>
  `;
}

function getReviewsIcon() {
    return `
    <span class="${CLASSNAMES.postReviews}">
      <svg class="${CLASSNAMES.iconReview}" width="18" height="18">
        <use href="${SVG_PATHS.postIcons}#icon-reviews"></use>
      </svg>
    </span>
  `;
}

//Generate Full Post

function generatePost(post) {
    const {
        type,
        media,
        content,
        author,
        date,
        readTime,
        reviews,
        rating,
        title,
        description,
    } = post;

    let mediaBlock = '';
    let audioTrack = '';

    const authorInfo = `
    <div class="${CLASSNAMES.postHeader}">
      <img class="${CLASSNAMES.postAvatar}" src="${author.avatar}" alt="${author.name}">
      <div class="${CLASSNAMES.postMeta}">
        <h4 class="${CLASSNAMES.postName}">${author.name}</h4>
        <div class="${CLASSNAMES.postDetails}">
          <p>${date} • ${readTime} • ${getReviewsIcon()} ${reviews}</p>
          ${generateStars(rating)}
        </div>
      </div>
    </div>
  `;

    // Media Block

    switch (type) {
        case 'video': {
            const hasVideo = content?.src;
            mediaBlock = hasVideo
                ? `
          <video controls poster="${media}" class="${CLASSNAMES.postMedia} ${CLASSNAMES.postMediaVideo}">
            <source src="${content.src}" type="video/mp4">
          </video>
        `
                : `
          <div class="${CLASSNAMES.postMedia} ${CLASSNAMES.postMediaVideo}">
            <img src="${media}" alt="Video preview">
          </div>
        `;
            break;
        }

        case 'audio': {
            const hasAudio = content?.src;
            mediaBlock = `
        <div class="${CLASSNAMES.postMedia} ${CLASSNAMES.postMediaAudio}">
          <img src="${media}" alt="Audio Cover">
        </div>
      `;
            audioTrack = hasAudio
                ? `<audio controls src="${content.src}"></audio>`
                : '';
            break;
        }

        case 'photo': {
            mediaBlock = `
        <div class="${CLASSNAMES.postMedia} ${CLASSNAMES.postMediaPhoto}">
          <img src="${media}" alt="Post Photo">
        </div>
      `;
            break;
        }

        default:
            mediaBlock = '';
    }

    const textBlock = `
    <div class="${CLASSNAMES.postBody}">
      <h3 class="${CLASSNAMES.postTitle}">${title}</h3>
      ${audioTrack}
      <p class="${CLASSNAMES.postDesc}">${description}</p>
    </div>
    <button class="${CLASSNAMES.btn} ${CLASSNAMES.postReadMore}">Read more</button>
  `;

    return `
    <article class="${CLASSNAMES.post} post--${type}">
      ${mediaBlock}
      <div class="${CLASSNAMES.postContent}">
        ${getTypeIcon(type)}
        ${authorInfo}
        ${textBlock}
      </div>
    </article>
  `;
}

//  Init

fetchJson('js/json/posts.json').then((posts) => {
    posts.forEach((post) => {
        const element = renderPost(post);
        containerPosts.appendChild(element);
    });
});
