import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticiasFormComponent } from './noticias-form.component';

describe('NoticiasFormComponent', () => {
  let component: NoticiasFormComponent;
  let fixture: ComponentFixture<NoticiasFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoticiasFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoticiasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
