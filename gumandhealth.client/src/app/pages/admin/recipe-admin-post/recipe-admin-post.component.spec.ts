import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeAdminPostComponent } from './recipe-admin-post.component';

describe('RecipeAdminPostComponent', () => {
  let component: RecipeAdminPostComponent;
  let fixture: ComponentFixture<RecipeAdminPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecipeAdminPostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeAdminPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
