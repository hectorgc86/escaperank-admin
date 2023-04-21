import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticiasNewComponent } from './noticias-new.component';

describe('NoticiasNewComponent', () => {
  let component: NoticiasNewComponent;
  let fixture: ComponentFixture<NoticiasNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoticiasNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoticiasNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
