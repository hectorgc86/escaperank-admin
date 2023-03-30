import { ComponentFixture, TestBed } from "@angular/core/testing";

import { SalasExploreComponent } from "./salas-explore.component";

describe("SalasExploreComponent", () => {
  let component: SalasExploreComponent;
  let fixture: ComponentFixture<SalasExploreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SalasExploreComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SalasExploreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
