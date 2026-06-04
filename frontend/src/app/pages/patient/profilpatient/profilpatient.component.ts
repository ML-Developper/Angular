import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PatientService } from '../../../service/patient.service';
import { FooterComponent } from '../../../components/footer/footer.component';
import { NavPatientComponent } from '../../../components/nav-patient/nav-patient.component';

@Component({
  selector: 'app-profilpatient',
  standalone: true,
  imports: [
    CommonModule,
    FooterComponent,
    NavPatientComponent,
    RouterModule
  ],
  templateUrl: './profilpatient.component.html',
  styleUrls: ['./profilpatient.component.css']
})
export class ProfilpatientComponent {

  patient: any = null;

  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService
  ) {}

  ngOnInit() {

    const id =
      this.route.snapshot.paramMap.get('id');

    console.log('ID = ', id);

    if (id) {

      this.patientService
        .getPatientById(id)
        .subscribe({

          next: (data) => {

            console.log(data);

            this.patient = data;

          },

          error: (err) => {

            console.log(err);

          }

        });

    }

  }

}