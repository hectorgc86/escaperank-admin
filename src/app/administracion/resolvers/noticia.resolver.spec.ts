import { TestBed } from '@angular/core/testing';

import { NoticiaResolver } from './noticia.resolver';

describe('UsuarioResolver', () => {
  let resolver: NoticiaResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(NoticiaResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
