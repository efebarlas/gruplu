import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  constructor() { }

  ngOnInit(): void {
  }

  LoginUser(): void {
    if (this.username == "sample" && this.password == "sample") {
      console.log('hello');
    }
  }
}
