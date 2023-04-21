import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalasMainComponent } from './salas-main.component';

describe('SalasMainComponent', () => {
  let component: SalasMainComponent;
  let fixture: ComponentFixture<SalasMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalasMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalasMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
