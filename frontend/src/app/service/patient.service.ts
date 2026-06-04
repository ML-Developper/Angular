import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Patient } from '../models/patient';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  url = 'http://localhost:3000/api/patient';
  constructor( private http: HttpClient) { }

 addPatient(patient: any){
  return this.http.post(this.url + '/ajout', patient ,{responseType: 'text'});
 }

  getPatientById(id: string): Observable<any> {
    return this.http.get(`${this.url}/${id}`);
  }

  updatePatient(id: string, data: any) {

  return this.http.put(

    `${this.url}/${id}`,
    data

  );

}
}
