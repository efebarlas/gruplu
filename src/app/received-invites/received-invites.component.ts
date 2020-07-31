import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';
import { map } from 'rxjs/operators';
import { DocumentReference } from '@angular/fire/firestore';

@Component({
  selector: 'app-received-invites',
  templateUrl: './received-invites.component.html',
  styleUrls: ['./received-invites.component.scss']
})
export class ReceivedInvitesComponent implements OnInit {
  @Input() groupId: string;
  @Input() inviteList: Observable<any[]>;
  message: string = null;

  constructor(private userSvc: UserService) { }
  
  async acceptRequest(uid: DocumentReference) {
    this.userSvc.acceptRequest(this.groupId, uid).then(() => {
      this.message = 'Accepted';
      setTimeout(() => {this.message=null},1000);
    });
  }

  async declineRequest(uid: DocumentReference) {
    this.userSvc.declineRequest(this.groupId, uid).then(() => {
      this.message = 'Declined';
      setTimeout(() => {this.message=null},1000);
    });
  }

  ngOnInit(): void {
    this.inviteList = this.inviteList.pipe(
      map(ids => {
        return ids.map(id => {
          let req = {
            'name': 'anonim',
            'id': id
          }; 

          this.userSvc.get(id, 'name').subscribe(name => {
            req.name = name;
          });
          
          return req;
        }); 
      })
    );
  }

}
