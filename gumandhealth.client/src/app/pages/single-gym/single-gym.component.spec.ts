import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleGymComponent } from './single-gym.component';

describe('SingleGymComponent', () => {
  let component: SingleGymComponent;
  let fixture: ComponentFixture<SingleGymComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingleGymComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleGymComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
