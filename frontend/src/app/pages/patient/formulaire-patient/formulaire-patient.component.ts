import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from "../../home/navbar/navbar.component";
import { FooterComponent } from "../../../components/footer/footer.component";
import { Patient } from '../../../models/patient';
import { MedecinService } from '../../../service/medecin.service';
import { PatientService } from '../../../service/patient.service';
import { FormsModule, NgModel } from '@angular/forms';
import Swal from 'sweetalert2';






@Component({
  selector: 'app-formulaire-patient',
  standalone: true,
  imports: [RouterLink, NavbarComponent, FooterComponent, FormsModule],
  templateUrl: './formulaire-patient.component.html',
  styleUrl: './formulaire-patient.component.css'
})
export class FormulairePatientComponent {

  constructor(private _patientService: PatientService) { }

  patient: Patient = {
    nom: '',
    prenom: '',
    date_n: '',
    gouvernerat: '',
    tel: 0,
    adresse: '',
    email: '',
    password: '',
    genre: ''
  };

  confPassword: string = '';
  //ajouter un nouveau patient
  savePatient() {

    const requiredFields = [
      this.patient.nom?.trim(),
      this.patient.prenom?.trim(),
      this.patient.date_n?.trim(),
      this.patient.tel,
      this.patient.adresse?.trim(),

      this.patient.email?.trim(),
      this.patient.password?.trim(),
      this.patient.genre?.trim(),
      this.patient.gouvernerat?.trim()
    ];

    if (requiredFields.some(f => f === '' || f === null || f === undefined)) {
      Swal.fire("Erreur", "Veuillez remplir tous les champs obligatoires", "error");
      return;
    }







    if (this.confPassword == this.patient.password) {
      this._patientService.addPatient(this.patient).subscribe({
        next: (res) => {
          console.log("Patient ajouté avec succès", res);

          // reset formulaire
          this.patient = {
            nom: '',
            prenom: '',
            date_n: '',
            gouvernerat: '',
            tel: 0,
            adresse: '',
            email: '',
            password: ''
          };
        },
        error: (err) => {
          console.error("Erreur ajout patient", err);
        }
      });
      Swal.fire({
        title: "Drag me!",
        icon: "success",
        draggable: true
      });

    } else {

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Les mots de passe ne correspondent pas!",

      });
    }

  }
}
