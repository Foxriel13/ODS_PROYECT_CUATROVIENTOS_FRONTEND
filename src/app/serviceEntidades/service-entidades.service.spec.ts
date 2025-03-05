import { TestBed } from '@angular/core/testing';

import { ServiceEntidadesService } from './service-entidades.service';

describe('ServiceEntidadesService', () => {
  let service: ServiceEntidadesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceEntidadesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
