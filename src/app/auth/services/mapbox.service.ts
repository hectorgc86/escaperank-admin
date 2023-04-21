import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { HttpBackend, HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class MapboxService {
  private mapboxURL: string;
  private http: HttpClient;

  constructor(httpBackend: HttpBackend) {
    this.mapboxURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/";
    this.http = new HttpClient(httpBackend);
  }

  buscar(query: string) {
    return this.http
      .get(
        this.mapboxURL +
          query +
          ".json?country=ES&language=es&types=address&access_token=" +
          environment.mapBoxToken
      )
      .pipe(
        map((res: any) => {
          return res.features;
        })
      );
  }
}
