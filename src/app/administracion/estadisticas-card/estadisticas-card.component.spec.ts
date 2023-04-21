import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticasCardComponent } from './estadisticas-card.component';

describe('EstadisticasCardComponent', () => {
  let component: EstadisticasCardComponent;
  let fixture: ComponentFixture<EstadisticasCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstadisticasCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstadisticasCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
