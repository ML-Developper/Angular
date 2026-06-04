import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class MedecinService {

  url = 'http://localhost:3000/api/medecin';
  constructor( private http: HttpClient) { }

 addMedecin(data: FormData){
  return this.http.post(this.url + '/ajout', data );
 }

 getPatientById(id: string): Observable<any> {
     return this.http.get(`${this.url}/${id}`);
   }

 listmedecins(){
  return this.http.get(this.url + '/list');
 }


 getBySpecialite(specialite: string) {
  return this.http.get(`${this.url}/by-specialite/${specialite}`
  );
}

getMedecinById(id: string) {
  return this.http.get(`${this.url}/${id}`);
}

getPatientsByMedecin(id: string) {
  return this.http.get(`${this.url}/patients/${id}`);
}

getRendezVousByMedecin(id: string) {
  return this.http.get(`http://localhost:3000/api/medecin/rendezvous/${id}`);
}

updateMedecin(id: string, data: FormData) {
  return this.http.put(`${this.url}/${id}`, data);
}




}
