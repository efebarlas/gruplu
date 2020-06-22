import { Post } from './Post';

export class Poster {
    id: number;
    name: string;
    posts: Post[];
    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
        this.posts = [];
    }
}
