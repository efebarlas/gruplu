import { User } from './User';
import { Poster } from './Poster';
import { DocumentReference } from '@angular/fire/firestore';

export class Group extends Poster {
    members: DocumentReference[]; 
    constructor(name: string, creator: DocumentReference) {
        super(name);
        this.members = [creator];
    }
}
