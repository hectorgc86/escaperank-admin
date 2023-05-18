import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyiasMainComponent } from './companyias-main.component';

describe('CompanyiasMainComponent', () => {
  let component: CompanyiasMainComponent;
  let fixture: ComponentFixture<CompanyiasMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyiasMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyiasMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
