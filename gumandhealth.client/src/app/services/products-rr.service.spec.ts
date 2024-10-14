import { TestBed } from '@angular/core/testing';

import { ProductsRRService } from './products-rr.service';

describe('ProductsRRService', () => {
  let service: ProductsRRService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsRRService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
