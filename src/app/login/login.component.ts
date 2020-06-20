import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private auth: AngularFireAuth, private router: Router) { }

  ngOnInit(): void {
  }

  onLogin() {
    this.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(
      () => { this.router.navigateByUrl('/'); }
    );
  }

}
