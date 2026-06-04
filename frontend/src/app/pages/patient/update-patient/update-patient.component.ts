import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  ActivatedRoute,
  RouterLink,
  RouterModule
} from '@angular/router';

import { FormsModule } from '@angular/forms';

import Swal from 'sweetalert2';

import { PatientService } from '../../../service/patient.service';

import { FooterComponent } from '../../../components/footer/footer.component';
import { NavPatientComponent } from '../../../components/nav-patient/nav-patient.component';
import { NavbarComponent } from "../../home/navbar/navbar.component";
import { AccuielPatientComponent } from "../accuiel-patient/accuiel-patient.component";

@Component({
  selector: 'app-update-patient',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    RouterModule,
    FooterComponent,
    NavPatientComponent,
    NavbarComponent,
    AccuielPatientComponent
],

  templateUrl: './update-patient.component.html',
  styleUrl: './update-patient.component.css'
})

export class UpdatePatientComponent {


  patientId!: string;
  confPassword: string = '';

  patient: any = {
    nom: '',
    prenom: '',
    date_n: '',
    genre: '',
    gouvernerat: '',
    tel: '',
    adresse: '',
    email: '',
    password: ''
  };


  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService
  ) {}

  ngOnInit(): void {

    this.patientId =
      this.route.snapshot.paramMap.get('id')!;

    this.getPatient();
  }


  getPatient() {

    this.patientService
      .getPatientById(this.patientId)
      .subscribe({

        next: (data: any) => {

          this.patient = data;

          this.confPassword = data.password;

        },

        error: (err: any) => {

          console.log(err);

          Swal.fire(
            'Erreur',
            'Patient introuvable',
            'error'
          );

        }

      });

  }


  updatePatient() {

    // validation champs vides
    const requiredFields = [
      this.patient.nom,
      this.patient.prenom,
      this.patient.email,
      this.patient.tel,
      this.patient.adresse
    ];

    if (
      requiredFields.some(
        f => !f || f.trim() === ''
      )
    ) {
      Swal.fire(
        'Erreur',
        'Veuillez remplir tous les champs obligatoires',
        'error'
      );
      return;
    }

    // validation password
    if (this.patient.password !== this.confPassword) {

      Swal.fire(
        'Erreur',
        'Les mots de passe ne correspondent pas',
        'error'
      );

      return;
    }

    // update API
    this.patientService
      .updatePatient(
        this.patientId,
        this.patient
      )
      .subscribe({

        next: () => {

          Swal.fire(
            'Succès',
            'Patient modifié avec succès',
            'success'
          );

        },

        error: (err: any) => {

          console.log(err);

          Swal.fire(
            'Erreur',
            'Erreur serveur',
            'error'
          );

        }

      });

  }


  resetForm() {

    this.patient = {
      nom: '',
      prenom: '',
      date_n: '',
      genre: '',
      gouvernerat: '',
      tel: '',
      adresse: '',
      email: '',
      password: ''
    };

    this.confPassword = '';
  }

}