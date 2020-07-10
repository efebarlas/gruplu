import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DocumentSnapshot, Action, DocumentChangeAction } from '@angular/fire/firestore';
import { Group } from '../models/Group';

@Component({
  selector: 'app-group-profile',
  templateUrl: './group-profile.component.html',
  styleUrls: ['./group-profile.component.scss']
})
export class GroupProfileComponent implements OnInit {
  group$: Observable<any>;
  isMember$: Observable<Boolean>;
  constructor(public userSvc: UserService, private router: Router) { }

  ngOnInit(): void {
    const groupPath = this.router.url;
    this.group$ = this.userSvc.getDocByUrl(groupPath);
    this.group$.subscribe((group) => {
      this.isMember$ = this.userSvc.isUserInGroup(group.id);
    });
  }

}
