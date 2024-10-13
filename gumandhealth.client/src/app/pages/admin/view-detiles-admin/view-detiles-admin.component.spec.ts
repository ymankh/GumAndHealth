import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDetilesAdminComponent } from './view-detiles-admin.component';

describe('ViewDetilesAdminComponent', () => {
  let component: ViewDetilesAdminComponent;
  let fixture: ComponentFixture<ViewDetilesAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewDetilesAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewDetilesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
