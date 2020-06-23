import { User } from './User';
import { Poster } from './Poster';

export class Group extends Poster {
    members: User[]; 
    constructor(name: string, creator: User) {
        super(name);
        this.members = [creator];
    }
}
