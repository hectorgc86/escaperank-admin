import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalasDetailsComponent } from './salas-details.component';

describe('SalasDetailsComponent', () => {
  let component: SalasDetailsComponent;
  let fixture: ComponentFixture<SalasDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalasDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalasDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
