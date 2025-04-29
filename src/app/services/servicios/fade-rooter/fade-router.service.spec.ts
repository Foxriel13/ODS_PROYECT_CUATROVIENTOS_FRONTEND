import { TestBed } from '@angular/core/testing';

import { FadeRouterService } from './fade-router.service';

describe('FadeRouterService', () => {
  let service: FadeRouterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FadeRouterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
