import { Component, OnInit } from '@angular/core';
import { Post } from '../models/Post';
import { Poster } from '../models/Poster';
import { Group } from '../models/Group';
import { User } from '../models/User';
@Component({
  selector: 'app-compose',
  templateUrl: './compose.component.html',
  styleUrls: ['./compose.component.scss']
})
export class ComposeComponent implements OnInit {
  user = new User(2, 'hooligan34');
  a = new User(15, 'mirqelam');
  posters : Poster[] = [this.a, new Group(1,'serseriler', this.a), this.user, new Group(3,'yeniyetme', this.user), new User(4,'birkiuc')];
  constructor() { }
  add_post() {

  }
  ngOnInit(): void {
  }

}
