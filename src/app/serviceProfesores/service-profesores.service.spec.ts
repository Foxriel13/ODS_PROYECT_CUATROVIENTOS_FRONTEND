import { TestBed } from '@angular/core/testing';

import { ServiceProfesoresService } from './service-profesores.service';

describe('ServiceProfesoresService', () => {
  let service: ServiceProfesoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceProfesoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
