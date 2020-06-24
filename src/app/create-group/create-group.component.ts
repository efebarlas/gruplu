import { UserService } from '../user.service';
import { Component, OnInit, Input, HostListener, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss']
})
export class CreateGroupComponent implements OnInit {
  @Input() group_name: string;

  
  @Output() onClose: EventEmitter<boolean> = new EventEmitter();
  private wasInside = true;

  add_group() {
    this.userSvc.addGroup(this.group_name).then(() => {
      this.onClose.emit(true);
    });;
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
