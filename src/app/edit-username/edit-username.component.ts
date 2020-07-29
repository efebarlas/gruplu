import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-edit-username',
  templateUrl: './edit-username.component.html',
  styleUrls: ['./edit-username.component.scss']
})
export class EditUsernameComponent implements OnInit {
  input = new FormControl('', Validators.required);
  _isUnique: Boolean = true;

  constructor(private router: Router, private userSvc: UserService) {}

  onClose = new EventEmitter<boolean>();
  update() {
    const name = this.input.value;
    this.userSvc.isNameUnique(name).subscribe((isUnique) => {
      if (isUnique) {
        this.userSvc.updateUser(this.input.value, 'name');
        const url = decodeURIComponent(this.input.value);
        this.router.navigateByUrl(`users/${url}`);
      } else {
        this._isUnique = false;
        setTimeout(()=>{this._isUnique = true}, 1000);
      }
    });
  }
  ngOnInit(): void {
  }

}
