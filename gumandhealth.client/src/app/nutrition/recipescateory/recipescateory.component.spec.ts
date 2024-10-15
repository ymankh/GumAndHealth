import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipescateoryComponent } from './recipescateory.component';

describe('RecipescateoryComponent', () => {
  let component: RecipescateoryComponent;
  let fixture: ComponentFixture<RecipescateoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecipescateoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipescateoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
