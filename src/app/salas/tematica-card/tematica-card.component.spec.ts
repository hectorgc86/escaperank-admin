import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TematicaCardComponent } from './tematica-card.component';

describe('TematicaCardComponent', () => {
  let component: TematicaCardComponent;
  let fixture: ComponentFixture<TematicaCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TematicaCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TematicaCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
