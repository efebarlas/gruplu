import { Component, OnInit, ViewChild } from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Post } from '../models/Post';
import { UserService } from '../user.service';
import { map, pluck, last, tap, throttleTime, scan, mergeMap } from 'rxjs/operators';
import { DisplayedPost } from '../models/DisplayedPost';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  posts;
  userId: string;
  @ViewChild(CdkVirtualScrollViewport)
  viewport: CdkVirtualScrollViewport;
  
  theEnd = false;

  offset = new BehaviorSubject(null);
  infinite: Observable<any[]>;

  constructor(private userSvc: UserService, private afs: AngularFirestore, private auth: AngularFireAuth, private router: Router) {

    
    /*this.afs.collection<Post>('/posts', ref => ref.orderBy("date", "desc"))
    .valueChanges().subscribe(posts => {
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
          }
        }
      }
    )*/ 
   }

  getBatch(offset) {
    return this.afs.collection('/posts', ref => 
                ref.orderBy("date", "desc")
                .endBefore(offset)
                .endBefore(null)
    ).snapshotChanges()
    .pipe(
      tap(arr => (arr.length ? null : (this.theEnd = true))),
      map(arr => {
        return arr.reduce((acc, cur) => {
          const id = cur.payload.doc.id;
          const data = cur.payload.doc.data() as Post;
          const dp = new DisplayedPost(data.text, 'anonim', data.date);
          if (data.on_behalf_of && data.on_behalf_of.path) {
            this.afs.doc(data.on_behalf_of).valueChanges().subscribe(postRef=> {
                if (postRef) {
                  dp.poster = postRef['name'];
                }
            });
          }
          return { ...acc, [id]: dp};
        }, {});
      })
    );
  } 

  nextBatch(e, offset) {
    if (this.theEnd) {
      return;
    }
    const end = this.viewport.getRenderedRange().end;
    const total = this.viewport.getDataLength();
    if (end === total) { 
      this.offset.next(offset);
    }
  }

  trackByIdx(i) {
    return i;
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

  refresh() {
    this.ngOnInit();
  }
  dp: DisplayedPost;

    ngOnInit(): void {
    this.userId = this.userSvc.userId;
    //this.auth.authState.subscribe(user => {
     // if(user) this.userId = user.uid;
    //});
    const batchMap = this.offset.pipe(
      throttleTime(500),
      mergeMap(n => this.getBatch(n)),
      scan((acc, batch) => {
        return { ...acc, ...batch };
      }, {})
    );
    this.infinite = batchMap.pipe(map(v=>Object.values(v)));
  }
}
