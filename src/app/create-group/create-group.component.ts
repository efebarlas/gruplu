import { UserService } from '../user.service';
import { Component, OnInit, Input, HostListener, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss']
})
export class CreateGroupComponent implements OnInit {
  @Input() group_name: string;

  
  @Output() onClose: EventEmitter<boolean> = new EventEmitter();
  private wasInside = true;
  name = new FormControl('',Validators.required);
  _isUnique : boolean = true;

  add_group() {
    const name = this.name.value;
    this.userSvc.isGroupNameUnique(name).subscribe((isUnique) => {
      if (isUnique) {
        this.userSvc.addGroup(name).then(()=>{
          this.onClose.emit(true);
        });
      } else {
        this._isUnique = false;
        setTimeout(()=>{this._isUnique = true}, 1000);
      }
    });
  }
  constructor(private userSvc: UserService) { }

  ngOnInit(): void {
  }

  @HostListener('click') clickInside() {
    this.wasInside = !this.wasInside;
  }

  @HostListener('document:click') clickOutside() {
    if (!this.wasInside) {
      this.onClose.emit(true);

    }
    this.wasInside = false;
  }

  

}
