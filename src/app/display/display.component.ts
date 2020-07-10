import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit {
  @Input() field: string;
  @Input() user;
  data: any; 
  showEdit: boolean = false;

  constructor(public userSvc: UserService, private router: Router) { }

  toggleEdit() {
    this.showEdit = !this.showEdit;
  }

  closeEdit() {
    this.showEdit = false;
  }

  ngOnInit(): void {
    this.data = this.user.data[this.field] ? this.user.data[this.field]: `${this.field} not found`;
  }

  
}
