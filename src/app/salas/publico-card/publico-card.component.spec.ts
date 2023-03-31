import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicoCardComponent } from './publico-card.component';

describe('PublicoCardComponent', () => {
  let component: PublicoCardComponent;
  let fixture: ComponentFixture<PublicoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicoCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
