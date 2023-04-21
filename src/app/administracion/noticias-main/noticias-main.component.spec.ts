import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticiasMainComponent } from './noticias-main.component';

describe('NoticiasMainComponent', () => {
  let component: NoticiasMainComponent;
  let fixture: ComponentFixture<NoticiasMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoticiasMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoticiasMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
