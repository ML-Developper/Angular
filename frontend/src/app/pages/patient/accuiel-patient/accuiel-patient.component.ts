import { Component } from '@angular/core';
import { FooterComponent } from "../../../components/footer/footer.component";
import { HomeComponent } from "../../home/home.component";
import { NavPatientComponent } from "../../../components/nav-patient/nav-patient.component";
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MedecinService } from '../../../service/medecin.service';
import { FormsModule } from '@angular/forms';




@Component({
  selector: 'app-accuiel-patient',
  standalone: true,
  imports: [FooterComponent, HomeComponent, NavPatientComponent, CommonModule,FormsModule , RouterModule],
  templateUrl: './accuiel-patient.component.html',
  styleUrl: './accuiel-patient.component.css'
})
export class AccuielPatientComponent {

  

   constructor(
      private router: Router,
      private route: ActivatedRoute,
      private medecinService: MedecinService
    ) {}

  medecins: any[] = [];
  showTable: boolean = false;

specialite: string = '';

medecinId: string | null = null;

ngOnInit() {
  this.medecinId = this.route.snapshot.paramMap.get('id');
  console.log("Medecin ID =", this.medecinId);
}

filtrer(specialite: string) {
  this.showTable = true;
  this.specialite = specialite;
  this.medecinService.getBySpecialite(this.specialite)
    .subscribe((data: any) => {
      this.medecins = data;
      console.log("MEDCINS =", data);
    });

}



}
