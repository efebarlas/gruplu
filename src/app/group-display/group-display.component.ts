import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-group-display',
  templateUrl: './group-display.component.html',
  styleUrls: ['./group-display.component.scss']
})
export class GroupDisplayComponent implements OnInit {
  @Input() user;
  groups: Observable<unknown>;
  constructor(private userSvc: UserService) { }

  ngOnInit(): void {
    this.groups = this.userSvc.getGroupsOf(this.user.id);

  }

}
