import { Post } from './Post';

export class Poster {
    name: string;
    posts: Post[];
    constructor(name: string) {
        this.name = name;
        this.posts = [];
    }
}
