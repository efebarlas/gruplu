import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayGroupFieldComponent } from './display-group-field.component';

describe('DisplayGroupFieldComponent', () => {
  let component: DisplayGroupFieldComponent;
  let fixture: ComponentFixture<DisplayGroupFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayGroupFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayGroupFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
