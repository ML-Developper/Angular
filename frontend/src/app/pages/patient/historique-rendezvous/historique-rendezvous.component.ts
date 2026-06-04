import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { RendezvousService } from '../../../service/rendezvous.service';
import { NavPatientComponent } from "../../../components/nav-patient/nav-patient.component";
import { FooterComponent } from "../../../components/footer/footer.component";

@Component({
  selector: 'app-historique-rendezvous',
  standalone: true,
  imports: [CommonModule, RouterModule, NavPatientComponent, FooterComponent],
  templateUrl: './historique-rendezvous.component.html',
  styleUrl: './historique-rendezvous.component.css'
})
export class HistoriqueRendezvousComponent implements OnInit {

  rendezvousList: any[] = [];
  patientId: string = '';
  loading = true;
medecinsMap: any = {};
  constructor(
    private rendezvousService: RendezvousService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    // ✔ récupérer ID depuis localStorage (ton cas actuel)
    const user = localStorage.getItem('user');

    if (!user) {
      this.loading = false;
      return;
    }

    this.patientId = user; // IMPORTANT (string ID)

    console.log("PATIENT ID =", this.patientId);

    this.loadHistorique();
  }

 loadHistorique() {

  this.rendezvousService.getByPatient(this.patientId)
    .subscribe((rdvs: any) => {

      this.rendezvousList = rdvs;

      rdvs.forEach((r: any) => {

        const id = r.id_medecin;

        if (id && !this.medecinsMap[id]) {

          // ❌ mauvais : getByMedecin
          // ✅ bon : API médecin par ID (OBLIGATOIRE)

          this.rendezvousService.getMedecinById(id)
            .subscribe((med: any) => {

              this.medecinsMap[id] = med;

            });

        }

      });

      this.loading = false;

    });

}

getRdvClass(date: string): string {

  const rdvDate = new Date(date);
  const today = new Date();

  // enlever heure pour comparer seulement les dates
  rdvDate.setHours(0,0,0,0);
  today.setHours(0,0,0,0);

  if (rdvDate < today) {
    return 'rdv-past';
  }

  if (rdvDate.getTime() === today.getTime()) {
    return 'rdv-today';
  }

  return 'rdv-future';
}


}