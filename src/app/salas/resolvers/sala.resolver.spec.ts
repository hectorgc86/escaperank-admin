import { TestBed } from '@angular/core/testing';

import { SalaResolver } from './sala.resolver';

describe('SalaResolver', () => {
  let resolver: SalaResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(SalaResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
