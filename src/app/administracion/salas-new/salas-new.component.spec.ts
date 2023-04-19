import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalasNewComponent } from './salas-new.component';

describe('SalasNewComponent', () => {
  let component: SalasNewComponent;
  let fixture: ComponentFixture<SalasNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalasNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalasNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
