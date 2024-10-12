import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminClassEditComponent } from './admin-class-edit.component';

describe('AdminClassEditComponent', () => {
  let component: AdminClassEditComponent;
  let fixture: ComponentFixture<AdminClassEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminClassEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminClassEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
