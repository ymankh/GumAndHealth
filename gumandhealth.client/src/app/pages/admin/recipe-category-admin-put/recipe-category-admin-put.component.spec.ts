import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeCategoryAdminPutComponent } from './recipe-category-admin-put.component';

describe('RecipeCategoryAdminPutComponent', () => {
  let component: RecipeCategoryAdminPutComponent;
  let fixture: ComponentFixture<RecipeCategoryAdminPutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecipeCategoryAdminPutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeCategoryAdminPutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
