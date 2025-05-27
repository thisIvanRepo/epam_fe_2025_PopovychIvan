export default function createPost({ title, src, alt, content }) {
    return `
    <article class="post-promises">
    <img class="post-promises__image" src="${src}" alt="${alt}" />
    <div>
      <h2 class="post__title">${title}</h2>
      <p class="post__text">${content}</p>
    <div>
    </article>
  `;
}
