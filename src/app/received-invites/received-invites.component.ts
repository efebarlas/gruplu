import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-received-invites',
  templateUrl: './received-invites.component.html',
  styleUrls: ['./received-invites.component.scss']
})
export class ReceivedInvitesComponent implements OnInit {
  @Input() groupId: string;
  @Input() inviteList: Observable<any[]>;

  constructor(private userSvc: UserService) { }

  ngOnInit(): void {
    this.inviteList = this.inviteList.pipe(
      map(ids => {
        return ids.map(id => this.userSvc.get(id, 'name')) 
      })
    );
    console.log(this.inviteList);
  }

}
