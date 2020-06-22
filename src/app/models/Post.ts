import { Poster } from './Poster';

export class Post {
    public id: number;
    public text: string;
    public on_behalf_of: Poster;
    public date: Date;
    constructor(id: number, text: string, on_behalf_of: Poster, date: Date) {
        this.id = id;
        this.text = text;
        this.on_behalf_of = on_behalf_of;
        this.date = date;
    } 
}