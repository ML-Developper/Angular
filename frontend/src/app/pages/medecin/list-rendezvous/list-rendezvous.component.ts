import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavMedecinComponent } from "../../../components/nav-medecin/nav-medecin.component";
import { FooterComponent } from "../../../components/footer/footer.component";
import { MedecinService } from '../../../service/medecin.service';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-list-rendezvous',
  standalone: true,
  imports: [CommonModule, NavMedecinComponent, FooterComponent],
  templateUrl: './list-rendezvous.component.html',
  styleUrl: './list-rendezvous.component.css'
})
export class ListRendezvousComponent implements OnInit {

  rdvs: any[] = [];
patients: any;

  constructor(
    private medecinService: MedecinService,
    private authService: AuthService
  ) {}

 ngOnInit() {
  const id = this.authService.getUserId();

  if (!id) return;

  this.medecinService.getRendezVousByMedecin(id)
    .subscribe({
      next: (data: any) => {
        console.log(JSON.stringify(data, null, 2));
        this.rdvs = Array.isArray(data) ? data : [];
      },
      error: (err) => {
        console.log("ERROR RDV =", err);
        this.rdvs = [];
      }
    });
}
}