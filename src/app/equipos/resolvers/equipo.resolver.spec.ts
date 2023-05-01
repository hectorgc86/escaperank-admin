import { TestBed } from "@angular/core/testing";

import { EquipoResolver } from "./equipo.resolver";

describe("EquipoResolver", () => {
  let resolver: EquipoResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(EquipoResolver);
  });

  it("should be created", () => {
    expect(resolver).toBeTruthy();
  });
});
