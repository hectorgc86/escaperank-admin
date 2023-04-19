import { TestBed } from "@angular/core/testing";
import { SalaRankingResolver } from "./sala-ranking.resolver";

describe("SalaRankingResolver", () => {
  let resolver: SalaRankingResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(SalaRankingResolver);
  });

  it("should be created", () => {
    expect(resolver).toBeTruthy();
  });
});
