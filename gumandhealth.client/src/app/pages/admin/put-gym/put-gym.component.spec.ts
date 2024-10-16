import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PutGymComponent } from './put-gym.component';

describe('PutGymComponent', () => {
  let component: PutGymComponent;
  let fixture: ComponentFixture<PutGymComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PutGymComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PutGymComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
