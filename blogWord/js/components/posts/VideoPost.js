import { CLASSNAMES, MEDIA_TYPES } from '../../constants/blogConstants.js';
import BasePost from './BasePost.js';

class VideoPost extends BasePost {
    genMediaBlock() {
        const { video, photo } = this.post;

        return video?.src && photo?.src
            ? `
              <video controls poster="${photo.src}" class="${CLASSNAMES.postMedia} ${CLASSNAMES.postMediaVideo}">
                <source src="${video.src}" type="${MEDIA_TYPES.VIDEO_MP4}">
              </video>
            `
            : '';
    }
}

export default VideoPost;
