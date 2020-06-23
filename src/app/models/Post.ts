import { Poster } from './Poster';

export class Post {
    public text: string;
    public on_behalf_of: Poster;
    public date: Date;
    constructor(text: string, on_behalf_of: Poster, date: Date) {
        this.text = text;
        this.on_behalf_of = on_behalf_of;
        this.date = date;
    } 
}