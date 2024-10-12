import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeCategoryAdminComponent } from './recipe-category-admin.component';

describe('RecipeCategoryAdminComponent', () => {
  let component: RecipeCategoryAdminComponent;
  let fixture: ComponentFixture<RecipeCategoryAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecipeCategoryAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeCategoryAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
