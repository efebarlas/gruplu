import { Observable } from 'rxjs';

export class DisplayedPost {
    public text: string;
    public poster: string;
    public date: string;
    constructor(text: string, poster: string, date) {
        this.text = text;
        this.poster = poster;
        this.date = date.toDate().toString();
    } 
}