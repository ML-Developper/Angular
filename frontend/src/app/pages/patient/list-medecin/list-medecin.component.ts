import { Component } from '@angular/core';
import { FooterComponent } from "../../../components/footer/footer.component";
import { NavPatientComponent } from "../../../components/nav-patient/nav-patient.component";

@Component({
  selector: 'app-list-medecin',
  standalone: true,
  imports: [FooterComponent, NavPatientComponent],
  templateUrl: './list-medecin.component.html',
  styleUrl: './list-medecin.component.css'
})
export class ListMedecinComponent {

}
