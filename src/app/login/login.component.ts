import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Input() username: string;
  @Input() password: string;
  constructor(private userSvc: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  onLogin() {
    if (this.username && this.password) {
      this.userSvc.login(val.email, val.password)
      .subscribe(
        () => {
          console.log('Logged in');
          this.router.navigateByUrl('/');
        }
      )
    }
  }
  
}
