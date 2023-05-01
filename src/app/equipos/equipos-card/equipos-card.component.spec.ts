import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquiposCardComponent } from './equipos-card.component';

describe('EquiposCardComponent', () => {
  let component: EquiposCardComponent;
  let fixture: ComponentFixture<EquiposCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquiposCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquiposCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
