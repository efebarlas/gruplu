import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayGroupNameComponent } from './display-group-name.component';

describe('DisplayGroupNameComponent', () => {
  let component: DisplayGroupNameComponent;
  let fixture: ComponentFixture<DisplayGroupNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayGroupNameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayGroupNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
