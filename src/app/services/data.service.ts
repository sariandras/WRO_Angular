import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Registration } from '../models/registration.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  url = 'http://localhost:3000/registrations';

  constructor(public http: HttpClient) {}

  GetRegistrations(): Observable<Registration[]> {
    return this.http.get<Registration[]>(this.url);
  }
  GetRegistartion(id: string): Observable<Registration> {
    return this.http.get<Registration>(this.url + id);
  }
  AddNewRegistration(registration: Registration): Observable<Registration> {
    return this.http.post<Registration>(this.url, registration);
  }
  ModifyRegistration(registration: Registration): Observable<Registration> {
    return this.http.put<Registration>(`${this.url}/${registration.id}`, registration);
  }
  DeleteRegistration(id: string): Observable<Registration> {
    return this.http.delete<Registration>(`${this.url}/${id}`);
  }
}
