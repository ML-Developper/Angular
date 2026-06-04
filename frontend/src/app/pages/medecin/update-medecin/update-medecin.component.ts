import { Component, OnInit } from '@angular/core';
import { FooterComponent } from "../../../components/footer/footer.component";
import { NavbarComponent } from "../../home/navbar/navbar.component";
import { RouterLink, ActivatedRoute } from '@angular/router';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Medecin } from '../../../models/medecin';
import { MedecinService } from '../../../service/medecin.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-medecin',
  standalone: true,
  imports: [
    FooterComponent,
    NavbarComponent,
    RouterLink,
    FormsModule,
    CommonModule
  ],
  templateUrl: './update-medecin.component.html',
  styleUrl: './update-medecin.component.css'
})
export class UpdateMedecinComponent implements OnInit {

  constructor(
    private service: MedecinService,
    private route: ActivatedRoute
  ) { }


  //  IMAGE

  imagePreview: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;


  // ID

  medecinId!: string;


  // CONFIRM PASSWORD

  confirmPassword: string = '';


  //  DATA MODEL

  medecin: Medecin = {
    nom: '',
    prenom: '',
    date_n: '',
    genre: '',
    gouvernerat: '',
    tel: 0,
    adresse: '',
    email: '',
    password: '',
    specialite: '',
    assurance_m: false,

    jours_travaille: {
      lundi: false,
      mardi: false,
      mercredi: false,
      jeudi: false,
      vendredi: false,
      samedi: false,
      dimanche: false
    },

    heure_o: '',
    heure_f: '',
    image: ''
  };



  ngOnInit(): void {

    // récupérer id depuis URL
    this.medecinId = this.route.snapshot.paramMap.get('id')!;

    // charger données médecin
    this.getMedecin();
  }


  getMedecin() {

    this.service.getMedecinById(this.medecinId).subscribe({

      next: (data: any) => {

        this.medecin = data;

        // password confirm
        this.confirmPassword = data.password || '';

        // image preview
        if (data.image) {

          this.imagePreview =
            'http://localhost:3000/uploads/' + data.image;
        }

      },

      error: (err) => {

        console.error(err);

        Swal.fire(
          "Erreur",
          "Médecin introuvable",
          "error"
        );
      }

    });
  }


  onFileSelected(event: any) {

    const file = event.target.files[0];

    if (!file) return;

    // vérifier image
    if (!file.type.startsWith('image/')) {

      Swal.fire(
        "Erreur",
        "Fichier invalide",
        "error"
      );

      return;
    }

    this.selectedFile = file;

    // preview
    const reader = new FileReader();

    reader.onload = () => {

      this.imagePreview = reader.result;
    };

    reader.readAsDataURL(file);
  }


  saveMedecin() {



    const requiredFields = [

      this.medecin.nom?.trim(),
      this.medecin.prenom?.trim(),
      this.medecin.date_n?.trim(),
      this.medecin.genre?.trim(),
      this.medecin.gouvernerat?.trim(),
      this.medecin.adresse?.trim(),
      this.medecin.email?.trim(),
      this.medecin.password?.trim(),
      this.medecin.specialite?.trim(),
      this.medecin.heure_o?.trim(),
      this.medecin.heure_f?.trim(),
      this.medecin.tel

    ];

    if (
      requiredFields.some(
        f => f === '' || f === null || f === undefined
      )
    ) {

      Swal.fire(
        "Erreur",
        "Veuillez remplir tous les champs",
        "error"
      );

      return;
    }



    if (this.medecin.password !== this.confirmPassword) {

      Swal.fire(
        "Erreur",
        "Les mots de passe ne correspondent pas",
        "error"
      );

      return;
    }



    const formData = new FormData();

    // champs simples
    formData.append('nom', this.medecin.nom || '');
    formData.append('prenom', this.medecin.prenom || '');
    formData.append('date_n', this.medecin.date_n || '');
    formData.append('genre', this.medecin.genre || '');
    formData.append('gouvernerat', this.medecin.gouvernerat || '');
    formData.append('tel', String(this.medecin.tel ?? ''));
    formData.append('adresse', this.medecin.adresse || '');
    formData.append('email', this.medecin.email || '');
    formData.append('password', this.medecin.password || '');
    formData.append('specialite', this.medecin.specialite || '');
    formData.append(
      'assurance_m',
      String(this.medecin.assurance_m)
    );

    formData.append('heure_o', this.medecin.heure_o || '');
    formData.append('heure_f', this.medecin.heure_f || '');

    // role
    formData.append('role', 'medecin');

    // object
    formData.append(
      'jours_travaille',
      JSON.stringify(this.medecin.jours_travaille)
    );

    // image
    if (this.selectedFile) {

      formData.append(
        'image',
        this.selectedFile
      );
    }



    this.service.updateMedecin(
      this.medecinId,
      formData
    ).subscribe({

      next: (res) => {

        Swal.fire(
          "Succès",
          "Médecin modifié avec succès",
          "success"
        );

      },

      error: (err) => {

        console.error(err);

        Swal.fire(
          "Erreur",
          "Erreur serveur",
          "error"
        );
      }

    });

  }


  resetForm() {

    this.medecin = {

      nom: '',
      prenom: '',
      date_n: '',
      genre: '',
      gouvernerat: '',
      tel: 0,
      adresse: '',
      email: '',
      password: '',
      specialite: '',
      assurance_m: false,

      jours_travaille: {

        lundi: false,
        mardi: false,
        mercredi: false,
        jeudi: false,
        vendredi: false,
        samedi: false,
        dimanche: false
      },

      heure_o: '',
      heure_f: '',
      image: ''
    };

    this.confirmPassword = '';

    this.imagePreview = null;

    this.selectedFile = null;
  }

}