import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminShowClassesComponent } from './admin-show-classes.component';

describe('AdminShowClassesComponent', () => {
  let component: AdminShowClassesComponent;
  let fixture: ComponentFixture<AdminShowClassesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminShowClassesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminShowClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
