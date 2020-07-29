import { Component, OnInit, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  input = new FormControl('', Validators.required);
  @Input() field: string;
  constructor(private activeRoute: ActivatedRoute, private userSvc: UserService, private router: Router) {}
  onClose = new EventEmitter<boolean>();
  
  update() {
    this.userSvc.updateUser(this.input.value, this.field);
    this.onClose.emit(true);
  }

  ngOnInit(): void {
  }

}
