import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticasMainComponent } from './estadisticas-main.component';

describe('EstadisticasMainComponent', () => {
  let component: EstadisticasMainComponent;
  let fixture: ComponentFixture<EstadisticasMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstadisticasMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstadisticasMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
