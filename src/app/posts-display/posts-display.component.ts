import { Component, OnInit, ViewChild } from '@angular/core';
import { QueryFn, AngularFirestoreCollection, DocumentReference, AngularFirestore } from '@angular/fire/firestore';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { throttle, mergeMap, throttleTime } from 'rxjs/operators';

@Component({
  selector: 'app-posts-display',
  templateUrl: './posts-display.component.html',
  styleUrls: ['./posts-display.component.scss']
})
export class PostsDisplayComponent implements OnInit {
  
  docRef: DocumentReference;
  @ViewChild(CdkVirtualScrollViewport) viewport: CdkVirtualScrollViewport;

  theEnd = false;
  offset = new BehaviorSubject(null);
  infinite: Observable<any[]>;


  constructor(private userSvc: UserService, private afs: AngularFirestore, private router: Router) { }

  ngOnInit(): void {
    
  }


}
