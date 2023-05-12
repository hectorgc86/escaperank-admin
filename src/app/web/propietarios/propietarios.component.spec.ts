import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PropietariosComponent } from './propietarios.component';

describe('ServicesComponent', () => {
  let component: PropietariosComponent;
  let fixture: ComponentFixture<PropietariosComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PropietariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropietariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
