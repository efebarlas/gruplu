import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private auth: AngularFireAuth, private router: Router) { }

  group_posts = Array.from({length: 1000000}, (_, id) => ({id}));
  showCompose: boolean = false;

  logout() {
    this.auth.signOut().then(() => {this.router.navigateByUrl('/login');});
  }
  compose_open() {
    this.showCompose = !this.showCompose;
  }
  ngOnInit(): void {
  }

}
