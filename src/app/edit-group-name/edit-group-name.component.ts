import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-edit-group-name',
  templateUrl: './edit-group-name.component.html',
  styleUrls: ['./edit-group-name.component.scss']
})
export class EditGroupNameComponent implements OnInit {
  input = new FormControl('', Validators.required);
  _isUnique: Boolean = true;
  @Input() groupId: string;
  constructor(private router: Router, private userSvc: UserService) {}

  onClose = new EventEmitter<boolean>();
  ngOnInit(): void {
  }

  update() {
    const name = this.input.value;
    this.userSvc.isGroupNameUnique(name).subscribe((isUnique) => {
      if (isUnique) {
        this.userSvc.updateGroup(this.groupId, this.input.value, 'name');
        const url = decodeURIComponent(this.input.value);
        this.router.navigateByUrl(`groups/${url}`);
      } else {
        this._isUnique = false;
        setTimeout(() => {this._isUnique = true}, 1000);
      }
    });
  }

}
