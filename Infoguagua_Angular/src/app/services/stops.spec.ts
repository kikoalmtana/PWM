import { TestBed } from '@angular/core/testing';

import { Stops } from './stops';

describe('Stops', () => {
  let service: Stops;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Stops);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
