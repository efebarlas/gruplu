import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DocumentSnapshot, Action, DocumentChangeAction } from '@angular/fire/firestore';
import { Group } from '../models/Group';
import { AngularFireFunctions } from '@angular/fire/functions';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-group-profile',
  templateUrl: './group-profile.component.html',
  styleUrls: ['./group-profile.component.scss']
})
export class GroupProfileComponent implements OnInit {
  group$: Observable<any>;
  inviteSent: boolean;
  isMember: Observable<boolean>;
  groupId: string;
  inviteList;
  constructor(public userSvc: UserService, private router: Router) {}

  sendInvite() {
    this.userSvc.sendInvite(this.groupId);
  }

  ngOnInit(): void {
    const groupPath = this.router.url;
    this.group$ = this.userSvc.getDocByUrl(groupPath);
    
    this.inviteList = this.group$.pipe(
      filter(group => group && group.data),
      map(group => group.data.receivedRequests)
    );

    this.group$.subscribe((group) => {
      if (!(group && group.data)) {
        this.router.navigateByUrl('/404');
      } else {
        this.groupId = group.id;
        this.isMember = this.userSvc.isUserInGroup(this.groupId);
        this.userSvc.inviteSent(group.id).subscribe((isSent) => {
          this.inviteSent = isSent;
        });
      }
    });
  }
}
