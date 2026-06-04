import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedecinService } from '../../../service/medecin.service';
import { AuthService } from '../../../service/auth.service';
import { Router, RouterModule } from '@angular/router';
import { NavMedecinComponent } from "../../../components/nav-medecin/nav-medecin.component";
import { FooterComponent } from "../../../components/footer/footer.component";


@Component({
  selector: 'app-accueil-medecin',
  standalone: true,
  imports: [CommonModule, NavMedecinComponent, FooterComponent, RouterModule],
  templateUrl: './accueil-medecin.component.html',
  styleUrl: './accueil-medecin.component.css'
})
export class AccueilMedecinComponent implements OnInit {

  medecin: any;
  

  constructor(
    private medecinService: MedecinService,
    private authService: AuthService,
    private router: Router

    
  ) {}

 ngOnInit(): void {
  

  const id = this.authService.getUserId();

  console.log("ID médecin =", id);

  if (id) {

   this.medecinService.getMedecinById(id)
.subscribe({
  next: (data: any) => {

    const joursObj = data.jours_travaille || {};

    const joursArray = Object.keys(joursObj)
      .filter(jour => joursObj[jour] === true);

    this.medecin = {
      ...data,
      jours_travaille: joursArray
    };

  },
  error: (err) => console.log(err)
});

  }
}

  logout() {
  this.authService.logout();
  this.router.navigate(['/login']);
}
}
