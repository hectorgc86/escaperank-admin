import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosNavbarComponent } from './usuarios-navbar.component';

describe('UsuariosNavbarComponent', () => {
  let component: UsuariosNavbarComponent;
  let fixture: ComponentFixture<UsuariosNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuariosNavbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuariosNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
