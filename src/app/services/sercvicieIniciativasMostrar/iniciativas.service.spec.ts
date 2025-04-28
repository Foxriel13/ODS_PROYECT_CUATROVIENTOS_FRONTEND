import { TestBed } from '@angular/core/testing';

import { IniciativasService } from './iniciativas.service';

describe('IniciativasService', () => {
  let service: IniciativasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IniciativasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
