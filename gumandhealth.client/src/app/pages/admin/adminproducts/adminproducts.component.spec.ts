import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductsComponent } from './adminproducts.component';

describe('AdminproductsComponent', () => {
  let component: AdminProductsComponent;
  let fixture: ComponentFixture<AdminProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminProductsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
