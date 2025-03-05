import { TestBed } from '@angular/core/testing';

import { ServiceOdsService } from './service-ods.service';

describe('ServiceOdsService', () => {
  let service: ServiceOdsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceOdsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
