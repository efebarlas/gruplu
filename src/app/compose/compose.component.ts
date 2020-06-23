import { Component, OnInit, Input, HostListener, Output } from '@angular/core';
import { Post } from '../models/Post';
import { Poster } from '../models/Poster';
import { Group } from '../models/Group';
import { User } from '../models/User';
import { EventEmitter } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-compose',
  templateUrl: './compose.component.html',
  styleUrls: ['./compose.component.scss']
})
export class ComposeComponent implements OnInit {
  @Input() post_text: string;
  @Input() on_behalf_of: Poster;
  private wasInside = true;
  @Output() onClose: EventEmitter<boolean> = new EventEmitter();

  user = new User('hooligan34');
  a = new User('mirqelam');
  posters: Poster[] = [this.a, new Group('serseriler', this.a), this.user, new Group('yeniyetme', this.user), new User('birkiuc')];

  constructor(private afs: AngularFirestore) { }

  postCollection = this.afs.collection<Post>('/posts');


  @HostListener('click')
  clickInside() {
    this.wasInside = !this.wasInside;
  }

  @HostListener('document:click')
  clickOutside() {
    if (!this.wasInside) {
      this.onClose.emit(true);

    }
    this.wasInside = false;
  }

  add_post() {
    let date = new Date();
    this.postCollection.add({
      text: this.post_text,
      on_behalf_of: this.on_behalf_of,
      date: date
    }).then(() => {
      this.onClose.emit(true);
    });
  }
  ngOnInit(): void {
  }

}
