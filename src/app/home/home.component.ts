import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Post } from '../models/Post';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  posts = null;
  constructor(private afs: AngularFirestore, private auth: AngularFireAuth, private router: Router) { }

  group_posts = Array.from({length: 1000000}, (_, id) => ({id}));
  showCompose: boolean = false;


  logout() {
    this.auth.signOut().then(() => {this.router.navigateByUrl('/login');});
  }

  toggleCompose() {
    this.showCompose = !this.showCompose;
  }

  closeCompose() {
    this.showCompose = false;
  }
  ngOnInit(): void {
    this.posts = this.afs.collection('/posts', ref => ref.orderBy("date", "desc")
    .limit(10))
    .valueChanges();
  }

}
