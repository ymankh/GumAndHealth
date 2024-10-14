import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeAdminPutComponent } from './recipe-admin-put.component';

describe('RecipeAdminPutComponent', () => {
  let component: RecipeAdminPutComponent;
  let fixture: ComponentFixture<RecipeAdminPutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecipeAdminPutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeAdminPutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
