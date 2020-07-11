import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-display-username',
  templateUrl: './display-username.component.html',
  styleUrls: ['./display-username.component.scss']
})
export class DisplayUsernameComponent implements OnInit {
  @Input() user: Observable<any>;
  username: any;
  showEdit: boolean = false;

  constructor(public userSvc: UserService, private router: Router) { }

  toggleEdit() {
    this.showEdit = !this.showEdit;
  }

  closeEdit() {
    this.showEdit = false;
  }


  ngOnInit(): void {
    this.user.subscribe(user => {
      this.username = user.data.name ? user.data.name : 'Username not found';
    });
  }

}
