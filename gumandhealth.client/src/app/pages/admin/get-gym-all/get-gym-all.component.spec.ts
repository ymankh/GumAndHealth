import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetGymAllComponent } from './get-gym-all.component';

describe('GetGymAllComponent', () => {
  let component: GetGymAllComponent;
  let fixture: ComponentFixture<GetGymAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GetGymAllComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetGymAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
