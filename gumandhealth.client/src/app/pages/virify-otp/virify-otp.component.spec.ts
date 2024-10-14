import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VirifyOtpComponent } from './virify-otp.component';

describe('VirifyOtpComponent', () => {
  let component: VirifyOtpComponent;
  let fixture: ComponentFixture<VirifyOtpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VirifyOtpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VirifyOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
