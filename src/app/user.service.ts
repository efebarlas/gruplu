import { Injectable } from '@angular/core';
import { Observable, of, observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, DocumentReference, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { User } from './models/User';
import { concat } from 'rxjs';
import { map, switchMap, tap, take } from 'rxjs/operators';
import { Poster } from './models/Poster';
import { Group } from './models/Group';
import { Post } from './models/Post';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userId: string;
  groupCollection = this.afs.collection<Group>('/groups');

  constructor(private auth: AngularFireAuth, 
              private afs: AngularFirestore,
              private router: Router) {
    this.auth.authState.subscribe(user => {
      if(user) {
        this.userId = user.uid;
        let strr = `users/${this.userId}`;
        this.afs.doc(strr).snapshotChanges().subscribe((docSnapshot) => {
          if (!docSnapshot.payload.exists) {
            this.afs.collection(`users`).doc(this.userId).set({uid: this.userId});
          } else {
            if(!docSnapshot.payload.data()['roles']) {
              this.afs.doc(`users/${this.userId}`).update({roles: [this.afs.doc(`users/${this.userId}`).ref]});
            } 
            if (!docSnapshot.payload.data()['name'] || docSnapshot.payload.data()['name'] == 'isyanqar47') {
              this.router.navigateByUrl('/name');
            }
            if (!docSnapshot.payload.data()['posts']) {
              this.afs.doc(`users/${this.userId}`).update({posts: []});
            }
          }
        });
      }
    });
    
   }
  
  isNameUnique(name: String):  Observable<boolean>{
    return this.afs.collection('users', ref => ref.where("name", "==", name))
    .get().pipe(
      map((usersRef) => !(usersRef && usersRef.size > 0))
    );
  }
  hasName() {


  }

  updateName(name_: String) {
    this.afs.doc(`users/${this.userId}`).update({name: name_});
    this.router.navigateByUrl('');
  }

  getRoles(): Observable<DocumentReference[]> {
    // return an observable of strings
    let user = this.afs.doc(`users/${this.userId}`).valueChanges();
    let obs = user.pipe(map(userEach => userEach['roles']));
    return obs;
  }

  getRoleNames() {
    let arr = [];
    let returningObs = new Observable((observer) => {
      this.getRoles().subscribe((roleRefs) => {
          roleRefs.forEach((roleRef) => {
            roleRef.get().then((snap) => {
              arr.push([roleRef.path, snap.data()['name']]);
            })
          });
        })
      observer.next(arr);
    });
    
    return returningObs;
  }

  addPostToPoster(postRef: DocumentReference, poster: DocumentReference) {
    const posterRef = this.afs.doc(poster);

    let postsList = [];
    posterRef.get().subscribe((poster) => {
      postsList = poster.data().posts;
      postsList.push(postRef);
      posterRef.update({posts: postsList});
    });

    

  }

  async addGroup(name: string) {
    const userRef = this.afs.doc(`users/${this.userId}`);
    
    const data: Group = {
      name: name,
      members: [userRef.ref],
      posts: []
    }
    let rolesList = [];
    
    userRef.get().subscribe((user) => {
      rolesList = user.data().roles;
    });

    await this.groupCollection.add(data).then((role) => {
      rolesList.push(role);
      
    });
    userRef.update({roles: rolesList});

  }

  getPoster(post: Post): Observable<String> {
    return new Observable<String>(obs => {
      console.log(this.afs.doc(post.on_behalf_of));
      obs.next(post.on_behalf_of.toString());
    });
  }

  async login() {
    try {
      await this.auth.signInWithPopup(new auth.GoogleAuthProvider());
    } catch (error) {}
    return this.router.navigateByUrl('/'); 
  }
  
  async logout() {
    await this.auth.signOut();
  }
}
