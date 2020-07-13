import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayMembersComponent } from './display-members.component';

describe('DisplayMembersComponent', () => {
  let component: DisplayMembersComponent;
  let fixture: ComponentFixture<DisplayMembersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayMembersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
