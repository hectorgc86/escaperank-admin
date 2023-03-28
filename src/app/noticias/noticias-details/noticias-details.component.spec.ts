import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticiasDetailsComponent } from './noticias-details.component';

describe('NoticiasDetailsComponent', () => {
  let component: NoticiasDetailsComponent;
  let fixture: ComponentFixture<NoticiasDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoticiasDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoticiasDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
