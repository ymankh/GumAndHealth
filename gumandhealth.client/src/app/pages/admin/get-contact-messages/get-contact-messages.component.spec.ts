import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetContactMessagesComponent } from './get-contact-messages.component';

describe('GetContactMessagesComponent', () => {
  let component: GetContactMessagesComponent;
  let fixture: ComponentFixture<GetContactMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GetContactMessagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetContactMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
