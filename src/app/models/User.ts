import { Poster } from './Poster';
import { DocumentReference } from '@angular/fire/firestore';
export class User extends Poster {
    userId: string;
    roles: DocumentReference[];
    constructor(name: string, userId: string) {
        super(name);
        this.userId = userId;
    }
}