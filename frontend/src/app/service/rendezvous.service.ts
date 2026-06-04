import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RendezvousService {

   url = 'http://localhost:3000/api/rendezvous';

  constructor(private http: HttpClient) {}

  getByMedecin(id: string) {
    return this.http.get(`${this.url}/medecin/${id}`);
  }

 

  addRendezvous(data: any) {
    return this.http.post(`${this.url}/ajout`, data);
  }

  getByDate(id_medecin: string, date: string) {
  return this.http.get<any[]>(
    `${this.url}/by-date?id_medecin=${id_medecin}&date=${date}`
  );
}

getByPatient(id: string) {
  return this.http.get(`${this.url}/patient/${id}`);
}

getMedecinById(id: string) {
  return this.http.get(`http://localhost:3000/api/medecin/${id}`);
}
}
