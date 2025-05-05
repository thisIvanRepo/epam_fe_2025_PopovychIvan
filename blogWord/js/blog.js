import header from './baseComponents/header.js';
import fetchJson from './servises/fetchJson.js';
import BasePost from './components/posts/BasePost.js';
import AudioPost from './components/posts/AudioPost.js';
import VideoPost from './components/posts/VideoPost.js';
import { CLASSNAMES } from './constants/blogConstants.js';
import cutText from './servises/cutTextPost.js';

const containerPosts = document.getElementById('blog-posts');
try {
    const response = await fetchJson('js/json/posts.json');
    const posts = await response;

    posts.forEach((data) => {
        let post;

        switch (data.type) {
            case 'video':
                post = new VideoPost(data);
                break;
            case 'audio':
                post = new AudioPost(data);
                break;

            default:
                post = new BasePost(data);
        }

        containerPosts.appendChild(post.render());
    });

    // cutTexts
    const wrappers = document.querySelectorAll(`.${CLASSNAMES.postDescWraper}`);
    const contents = document.querySelectorAll(`.${CLASSNAMES.postDesc}`);

    if (wrappers.length === contents.length) {
        for (let i = 0; i < wrappers.length; i++) {
            contents[i].textContent = cutText(wrappers[i], contents[i]);
        }
    }
} catch (error) {
    alert(`Failed to load posts: ${error}`);
}
