import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UserService } from '../user.service';
import { Validators } from '@angular/forms';
import { Observable, interval, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-setname',
  templateUrl: './setname.component.html',
  styleUrls: ['./setname.component.scss']
})
export class SetnameComponent implements OnInit {
  name = new FormControl('',Validators.required);
  _isUnique : Boolean = true;

  updateName() {
    const name = this.name.value;
    this.userSvc.isNameUnique(name).subscribe((isUnique) => {
      if (isUnique) {
        this.userSvc.updateName(name);
      } else {
        this._isUnique = false;
        setTimeout(()=>{this._isUnique = true}, 1000);
      }
    });
    
  }
  constructor(private userSvc: UserService) { }

  ngOnInit(): void {
  }

}
