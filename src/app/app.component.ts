import { Component } from '@angular/core';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'gruplu';
  constructor(public userSvc: UserService, private router: Router) {}
  navigateToProfile() {
    this.userSvc.navigateToProfile();
  }
  logout() {
    this.userSvc.logout().then(() => this.router.navigateByUrl('login'));
  }
}
