import { Component, OnInit, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ClickAway } from '../click-away';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent extends ClickAway implements OnInit {
  input = new FormControl('', Validators.required);
  @Input() field: string;
  constructor(private activeRoute: ActivatedRoute, private userSvc: UserService, private router: Router) {super();}

  
  update() {
    this.userSvc.updateUser(this.input.value, this.field);
    this.onClose.emit(true);
  }

  ngOnInit(): void {
  }

}
