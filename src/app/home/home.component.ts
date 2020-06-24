import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Post } from '../models/Post';
import { UserService } from '../user.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  posts = null;
  userId: string;

  constructor(private userSvc: UserService, private afs: AngularFirestore, private auth: AngularFireAuth, private router: Router) { }

  showCompose: boolean = false;
  showGroup: boolean = false;

  logout() {
    this.userSvc.logout();
  }

  toggleCompose() {
    this.showCompose = !this.showCompose;
  }

  closeCompose() {
    this.showCompose = false;
  }

  toggleGroup() {
    this.showGroup = !this.showGroup;
  }

  closeGroup() {
    this.showGroup = false;
  }
  ngOnInit(): void {
    this.userId = this.userSvc.userId;
    //this.auth.authState.subscribe(user => {
     // if(user) this.userId = user.uid;
    //});
    this.posts = this.afs.collection('/posts', ref => ref.orderBy("date", "desc")
    .limit(10))
    .valueChanges();
  }

}
