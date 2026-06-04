import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'http://localhost:3000/api/auth/';

  constructor(private http: HttpClient) {}




  login(data: any) {

  return this.http.post<any>(
    `${this.url}login`,
    data
  );

}

  register(data: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(this.url + 'register', data, { headers });
  }


  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }


  setRole(role: string) {
     if (typeof window !== 'undefined') {
      localStorage.setItem('role', role);
    }
  }

  getRole(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('role');
    }
    return null;
  }

 
  setUser(user: any) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }

  getUser() {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    }
    return null;
  }


  getUserId() {
    const user = this.getUser();

    // support backend: _id OU id OU string direct
    return user?._id || user?.id || user;
  }


  isLoggedIn(): boolean {
    return !!this.getToken();
  }


  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('user');
    }
  }

  getMedecin() {
  const medecin = localStorage.getItem('user');
  return medecin ? JSON.parse(medecin) : null;
}

  
}