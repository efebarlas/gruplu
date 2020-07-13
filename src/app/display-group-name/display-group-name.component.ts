import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-display-group-name',
  templateUrl: './display-group-name.component.html',
  styleUrls: ['./display-group-name.component.scss']
})
export class DisplayGroupNameComponent implements OnInit {
  @Input() group: Observable<any>;
  groupName: any;
  showEdit: boolean = false;
  isMember: boolean = false;

  toggleEdit() {
    this.showEdit = !this.showEdit;
  }

  closeEdit() {
    this.showEdit = false;
  }

  constructor(public userSvc: UserService, private router: Router) { }

  ngOnInit(): void {
    this.group.subscribe(group => {
      this.userSvc.isUserInGroup(group.id).subscribe((b) => {
        this.isMember = b;
      });
      this.groupName = group.data.name ? group.data.name : 'Group name not found';
    })
  }

}
