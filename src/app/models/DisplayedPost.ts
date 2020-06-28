import { Observable } from 'rxjs';

export class DisplayedPost {
    public text: string;
    public poster: Object;
    public date: string;
    constructor(text: string, poster: Object, date) {
        this.text = text;
        this.poster = poster;
        this.date = date.toDate().toString();
    } 
}