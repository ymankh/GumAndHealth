import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeCategoryAdminPostComponent } from './recipe-category-admin-post.component';

describe('RecipeCategoryAdminPostComponent', () => {
  let component: RecipeCategoryAdminPostComponent;
  let fixture: ComponentFixture<RecipeCategoryAdminPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecipeCategoryAdminPostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeCategoryAdminPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
