import { ComponentFixture, TestBed } from '@angular/core/testing';

import { POSTGymComponent } from './post-gym.component';

describe('POSTGymComponent', () => {
  let component: POSTGymComponent;
  let fixture: ComponentFixture<POSTGymComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [POSTGymComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(POSTGymComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
