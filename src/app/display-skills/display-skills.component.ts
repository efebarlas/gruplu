import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators';
import { UserService } from '../user.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-display-skills',
  templateUrl: './display-skills.component.html',
  styleUrls: ['./display-skills.component.scss']
})
export class DisplaySkillsComponent implements OnInit {
  @Input() user: Observable<any>;
  skillList: Observable<string[]>;
  isUs: boolean = false;
  button_pressed: boolean = false;
  skill = new FormControl('', Validators.required);


  constructor(private userSvc: UserService) { }

  addSkill() {
    const skill = this.skill.value;
    this.userSvc.addSkill(skill);
    this.button_pressed = false;
    this.skill.setValue('');
  }

  removeSkill(skill: string) {
    this.userSvc.removeSkill(skill);
  }

  ngOnInit(): void {
    this.skillList = this.user.pipe(
      tap(user => {
         this.isUs = this.userSvc.userId == user.id;
      }),
      map(user => user.data.skills),
      filter(skills => skills)
    );
  }

}
