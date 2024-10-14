import { TestBed } from '@angular/core/testing';

import { GetInstructorService } from './get-instructor.service';

describe('GetInstructorService', () => {
  let service: GetInstructorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetInstructorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
