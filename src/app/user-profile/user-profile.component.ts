import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { User } from '../models/User';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user$: Observable<any>;
  constructor(private route: ActivatedRoute, public userSvc: UserService, private router: Router) { }

  ngOnInit(): void {

    this.user$ = this.route.params.pipe(
      map((params) => params['name']),
      switchMap((name) => this.userSvc.getUserByName(name))
    );
    this.user$.subscribe((user) => {
      if (!(user && user.data)) {
        this.router.navigateByUrl('/404');
      }
    });
  }

}
