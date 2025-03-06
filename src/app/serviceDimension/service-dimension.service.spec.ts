import { TestBed } from '@angular/core/testing';

import { ServiceDimensionService } from './service-dimension.service';

describe('ServiceDimensionService', () => {
  let service: ServiceDimensionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceDimensionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
