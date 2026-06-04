import { Component } from '@angular/core';
import { FooterComponent } from "../../../components/footer/footer.component";
import { NavPatientComponent } from "../../../components/nav-patient/nav-patient.component";

@Component({
  selector: 'app-mes-rendez-vous',
  standalone: true,
  imports: [FooterComponent, NavPatientComponent],
  templateUrl: './mes-rendez-vous.component.html',
  styleUrl: './mes-rendez-vous.component.css'
})
export class MesRendezVousComponent {

}
