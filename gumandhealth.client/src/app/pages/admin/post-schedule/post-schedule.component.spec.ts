import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostScheduleComponent } from './post-schedule.component';

describe('PostScheduleComponent', () => {
  let component: PostScheduleComponent;
  let fixture: ComponentFixture<PostScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostScheduleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
