import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-patient',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './nav-patient.component.html',
  styleUrls: ['./nav-patient.component.css']
})
export class NavPatientComponent {

  userId: string | null = null;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    
    this.userId = this.authService.getUserId();
    console.log("NAV USER =", this.userId);
  }

  logout() {
    this.authService.logout();

    localStorage.removeItem('userId');

    this.router.navigateByUrl('/home', {
      replaceUrl: true
    });
  }
}