import { User } from './User';
import { Poster } from './Poster';

export class Group extends Poster {
    members: User[]; 
    constructor(id: number, name: string, creator: User) {
        super(id, name);
        this.members = [creator];
    }
}
