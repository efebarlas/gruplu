import { Poster } from './Poster';
import { DocumentReference} from '@angular/fire/firestore';

export class Post {
    public text: string;
    public on_behalf_of?: DocumentReference;
    public date: Date;
    constructor(text: string, on_behalf_of: DocumentReference, date: Date) {
        this.text = text;
        this.on_behalf_of = on_behalf_of;
        this.date = date;
    } 
}