import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DificultadCardComponent } from './dificultad-card.component';

describe('DificultadCardComponent', () => {
  let component: DificultadCardComponent;
  let fixture: ComponentFixture<DificultadCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DificultadCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DificultadCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
