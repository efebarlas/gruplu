import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivedInvitesComponent } from './received-invites.component';

describe('ReceivedInvitesComponent', () => {
  let component: ReceivedInvitesComponent;
  let fixture: ComponentFixture<ReceivedInvitesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceivedInvitesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceivedInvitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
