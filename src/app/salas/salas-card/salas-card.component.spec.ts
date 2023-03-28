import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalasCardComponent } from './salas-card.component';

describe('SalasCardComponent', () => {
  let component: SalasCardComponent;
  let fixture: ComponentFixture<SalasCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalasCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalasCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
