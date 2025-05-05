import { CLASSNAMES, TEXTS_POSTS } from '../../constants/blogConstants.js';
import BasePost from './BasePost.js';

class AudioPost extends BasePost {
    genTextBlock() {
        const { title, description, audio } = this.post;
        const audioTrack = audio?.src
            ? `<audio controls src="${audio.src}"></audio>`
            : '';

        return `
    <div class="${CLASSNAMES.postBody}">
      <h3 class="${CLASSNAMES.postTitle}">${title}</h3>
      ${audioTrack}
      <div class="${CLASSNAMES.postDescWraper} ${CLASSNAMES.postDescWraperAudio}">
          <p class="${CLASSNAMES.postDesc}">${description}</p>
      </div>
    </div>
    <button class="${CLASSNAMES.btn} ${CLASSNAMES.postReadMore}">${TEXTS_POSTS.READ_MORE}</button>
  `;
    }
}

export default AudioPost;
