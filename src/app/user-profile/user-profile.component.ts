import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: Observable<any>;
  constructor(private userSvc: UserService, private router: Router) { }

  ngOnInit(): void {
    const userPath = this.router.url;
    this.user = this.userSvc.getDocByUrl(userPath);
  }

}
