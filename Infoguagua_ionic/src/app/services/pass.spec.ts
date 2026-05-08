import { TestBed } from '@angular/core/testing';

import { Pass } from './pass';

describe('Pass', () => {
  let service: Pass;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Pass);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
