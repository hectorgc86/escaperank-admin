import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebService {

  private emailUrl = 'mail'; // Reemplaza con la URL de tu servicio en el back-end

  constructor(private http: HttpClient) { }

  sendEmail(emailData: any):Observable<any> {
    return this.http.post(`${this.emailUrl}`,emailData).pipe(map((response) => response));;
  }
}
