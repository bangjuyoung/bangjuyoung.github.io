import { PostFactory } from './post.factory';

let _instance: PostFactory | undefined;

export function getPostFactory() {
  if (!_instance) {
    _instance = new PostFactory();
  }

  return _instance;
}
