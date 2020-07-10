import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsDisplayComponent } from './posts-display.component';

describe('PostsDisplayComponent', () => {
  let component: PostsDisplayComponent;
  let fixture: ComponentFixture<PostsDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostsDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
