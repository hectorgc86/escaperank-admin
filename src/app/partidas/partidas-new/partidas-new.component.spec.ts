import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartidasNewComponent } from './partidas-new.component';

describe('PartidasNewComponent', () => {
  let component: PartidasNewComponent;
  let fixture: ComponentFixture<PartidasNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartidasNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartidasNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
