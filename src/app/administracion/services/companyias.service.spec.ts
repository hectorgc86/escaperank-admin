import { TestBed } from '@angular/core/testing';

import { CompanyiasService } from './companyias.service';

describe('CompanyiasService', () => {
  let service: CompanyiasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyiasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
