import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplayContactComponent } from './replay-contact.component';

describe('ReplayContactComponent', () => {
  let component: ReplayContactComponent;
  let fixture: ComponentFixture<ReplayContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReplayContactComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReplayContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
