import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Post } from '../models/Post';
import { UserService } from '../user.service';
import { map, pluck, last, tap } from 'rxjs/operators';
import { DisplayedPost } from '../models/DisplayedPost';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  posts: DisplayedPost[] = [];
  userId: string;

  constructor(private userSvc: UserService, private afs: AngularFirestore, private auth: AngularFireAuth, private router: Router) {
    this.afs.collection<Post>('/posts', ref => ref.orderBy("date", "desc")
    .limit(10)).valueChanges().subscribe(posts => {
        let name = 'anonim';
        this.posts = new Array(posts.length);
        for (let i = 0; i < posts.length; i++) {
          this.posts[i] = new DisplayedPost(posts[i].text,name,posts[i].date);
          if (posts[i].on_behalf_of && posts[i].on_behalf_of.path) {
            this.afs.doc(posts[i].on_behalf_of).valueChanges().subscribe(postRef => {
                this.posts[i].poster = postRef['name'];
            });
          }
         /* try {
            if (typeof post.on_behalf_of !== "string") {
              this.afs.doc(post.on_behalf_of).get().subscribe(ref => {
                name = ref && ref.data() && ref.data().name && 
                            typeof ref.data().name != "undefined" && 
                            ref.data().name != "undefined" &&
                            ref.data().name != "[object Object]" ? ref.data().name : 'anonim';

                return new DisplayedPost(post.text, name, post.date); 
              });
          } else {
            return new DisplayedPost(post.text, 'anonim', post.date);
          }
          } catch (err) {     
            return new DisplayedPost(post.text,'anonim',post.date);       
          }*/
        }
      }
    ) 
   }

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

  dp: DisplayedPost;

    ngOnInit(): void {
    this.userId = this.userSvc.userId;
    //this.auth.authState.subscribe(user => {
     // if(user) this.userId = user.uid;
    //});
    
  }
}
