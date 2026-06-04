import { Component, OnInit } from '@angular/core';
import { NavMedecinComponent } from "../../../components/nav-medecin/nav-medecin.component";
import { FooterComponent } from "../../../components/footer/footer.component";
import { RouterLink } from "@angular/router";
import { MedecinService } from '../../../service/medecin.service';
import { AuthService } from '../../../service/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-patients',
  standalone: true,
  imports: [NavMedecinComponent, FooterComponent, RouterLink, CommonModule],
  templateUrl: './list-patients.component.html',
  styleUrl: './list-patients.component.css'
})
export class ListPatientComponent implements OnInit {

  patients: any[] = [];

  constructor(
    private medecinService: MedecinService,
    private authService: AuthService
  ) {}



ngOnInit() {
  const id = this.authService.getUserId();

  this.medecinService.getPatientsByMedecin(id)
    .subscribe({
      next: (data: any) => {
        this.patients = Array.isArray(data) ? data : [];
        console.log("PATIENTS =", data);
      },
      error: (err) => {
        console.log(err);
        this.patients = [];
      }
    });
}


}
