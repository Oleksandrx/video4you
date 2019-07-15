import { TestBed } from '@angular/core/testing';

import { VideolinkService } from './videolink.service';

describe('VideolinkService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VideolinkService = TestBed.get(VideolinkService);
    expect(service).toBeTruthy();
  });
});
