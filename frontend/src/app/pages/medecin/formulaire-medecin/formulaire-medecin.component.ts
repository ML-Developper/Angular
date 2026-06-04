import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from "../../home/navbar/navbar.component";
import { FooterComponent } from "../../../components/footer/footer.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { MedecinService } from '../../../service/medecin.service';
import { Medecin } from '../../../models/medecin';

@Component({
  selector: 'app-formulaire-medecin',
  standalone: true,
  imports: [RouterLink, NavbarComponent, FooterComponent, FormsModule, CommonModule],
  templateUrl: './formulaire-medecin.component.html',
  styleUrl: './formulaire-medecin.component.css'
})
export class FormulaireMedecinComponent {

  constructor(private service: MedecinService) { }

  
  imagePreview: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;

 
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
    image: '1778092976433-bg1.jpg'
  };

  confirmPassword: string = '';

  //  IMAGE UPLOAD

  onFileSelected(event: any) {
    const file = event.target.files[0];

    if (!file) return;

    // check image type
    if (!file.type.startsWith('image/')) {
      Swal.fire("Erreur", "Fichier invalide", "error");
      return;
    }

    this.selectedFile = file;

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }


  // SAVE MEDECIN

  saveMedecin() {

    const requiredFields = [
      this.medecin.nom?.trim(),
      this.medecin.prenom?.trim(),
      this.medecin.date_n?.trim(),
      this.medecin.tel,
      this.medecin.adresse?.trim(),
      this.medecin.heure_o?.trim(),
      this.medecin.heure_f?.trim(),
      this.medecin.specialite?.trim(),
      this.medecin.email?.trim(),
      this.medecin.password?.trim(),
      this.medecin.genre?.trim(),
      this.medecin.gouvernerat?.trim(),
      this.medecin.role = 'medecin'
    ];


    if (requiredFields.some(f => f === '' || f === null || f === undefined)) {
      Swal.fire("Erreur", "Veuillez remplir tous les champs obligatoires", "error");
      return;
    }
    if (this.medecin.password !== this.confirmPassword) {
      Swal.fire("Erreur", "Les mots de passe ne correspondent pas", "error");
      return;
    }

    const formData = new FormData();

    // 🔹 champs simples
    formData.append('nom', this.medecin.nom || '');
    formData.append('prenom', this.medecin.prenom || '');
    formData.append('date_n', this.medecin.date_n || '');
    formData.append('gouvernerat', this.medecin.gouvernerat || '');
    formData.append('tel', String(this.medecin.tel ?? ''));
    formData.append('adresse', this.medecin.adresse || '');
    formData.append('email', this.medecin.email || '');
    formData.append('password', this.medecin.password || '');
    formData.append('specialite', this.medecin.specialite || '');
    formData.append('assurance_m', String(this.medecin.assurance_m));
    formData.append('heure_o', this.medecin.heure_o || '');
    formData.append('heure_f', this.medecin.heure_f || '');

    // 🔹 object
    formData.append(
      'jours_travaille',
      JSON.stringify(this.medecin.jours_travaille)
    );

    // 🔹 image (IMPORTANT: must be 'image')
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }


    //  CALL API


    //********************** */
    this.service.addMedecin(formData).subscribe({
      next: (res) => {
        Swal.fire("Succès", "Médecin ajouté", "success");

        // reset form
        this.resetForm();
      },
      error: (err) => {
        console.error(err);
        Swal.fire("Erreur", "Serveur", "error");
      }
    });
    //************************************** */


  }


  // RESET FORM

  resetForm() {
    this.medecin = {
      nom: '',
      prenom: '',
      date_n: '',
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