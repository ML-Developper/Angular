import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import { NavPatientComponent } from "../../../components/nav-patient/nav-patient.component";
import { FooterComponent } from "../../../components/footer/footer.component";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { MedecinService } from '../../../service/medecin.service';
import { ChangeDetectorRef } from '@angular/core';
import { RendezvousService } from '../../../service/rendezvous.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-pagerendezvous',
  standalone: true,
  imports: [
    NavPatientComponent,
    FooterComponent,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './pagerendezvous.component.html',
  styleUrl: './pagerendezvous.component.css',
  providers: [provideNativeDateAdapter()],

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PagerendezvousComponent {

  constructor(private router: Router,
    private route: ActivatedRoute,
    private medecinService: MedecinService,
    private rendezvousService: RendezvousService,
    private cdr: ChangeDetectorRef
  ) { }

  selectedDate: Date | null = null;
  selectedTime: string | null = null;
  medecinId: string = '';

  medecin: any;

  rendezvousList: any[] = [];

  timeSlots: string[] = [];

  blockedHours: string[] = [];

  


 ngOnInit() {

  this.medecinId = this.route.snapshot.paramMap.get('id') || '';

  this.medecinService.getPatientById(this.medecinId)
    .subscribe((data) => {

      this.medecin = data;

      this.cdr.markForCheck(); // 🔥 IMPORTANT
    });

  this.rendezvousService.getByMedecin(this.medecinId)
    .subscribe((data: any) => {

      this.rendezvousList = [...data]; // 🔥 IMPORTANT (nouvelle référence)

      console.log("RENDEZVOUS =", data);

      this.cdr.markForCheck(); // 🔥 IMPORTANT
    });
}




  // heures déjà réservées (exemple)
  bookedSlots: { [date: string]: string[] } = {
    '2026-05-05': ['08:30', '10:00'],
    '2026-05-06': ['09:00']
  };



  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = this.pad(date.getMonth() + 1);
    const day = this.pad(date.getDate());

    return `${year}-${month}-${day}`;
  }

 onDateSelected(date: Date) {

  this.selectedDate = date;
  this.selectedTime = null;

  const dateKey = this.formatDate(date);

  this.rendezvousService.getByMedecin(this.medecinId)
    .subscribe((data: any) => {

      // NORMALISATION FORCÉE
      this.rendezvousList = data.filter((r: any) => {

        const rdvDate = r.date?.substring(0, 10);

        return rdvDate === dateKey;

      });

      console.log("FILTERED RDV =", this.rendezvousList);
    });

  this.generateTimeSlots();
}

  generateTimeSlots() {
    const slots: string[] = [];

    for (let h = 8; h < 18; h++) {
      slots.push(`${this.pad(h)}:00`);
      slots.push(`${this.pad(h)}:30`);
    }

    this.timeSlots = slots;
  }

  pad(n: number) {
    return n < 10 ? '0' + n : n;
  }

  isBlocked(time: string): boolean {

     this.refreshRendezvous(); 

     if (!this.selectedDate) return false;

  const dateKey = this.formatDate(this.selectedDate);

  return this.rendezvousList.some(r => {

    const rdvDate = r.date?.substring(0, 10);

    return rdvDate === dateKey && r.heure === time;

  });
    
  }

  selectTime(time: string) {
    
    if (this.isBlocked(time)) return;
    this.selectedTime = time;
   
  }

  saveRendezvous() {

    if (!this.selectedDate || !this.selectedTime) {
      return;
    }

    const patientId = localStorage.getItem('user');

    const data = {

      date: this.formatDate(this.selectedDate),

      heure: this.selectedTime,

      id_patient: patientId,

      id_medecin: this.medecinId
    };

    this.rendezvousService.addRendezvous(data)
      .subscribe({

        next: (res) => {


          Swal.fire({
  title: "Rendez-vous ajouté",
  icon: "success",
  draggable: true
});

          // refresh rendez-vous
          this.rendezvousService.getByMedecin(this.medecinId)
            .subscribe((data: any) => {

              this.rendezvousList = data;

            });

        },

        error: (err) => {
          console.log(err);
        }

      });
  }

  refreshTimeout: any;

refreshRendezvous() {
  clearTimeout(this.refreshTimeout);

  this.refreshTimeout = setTimeout(() => {
    this.rendezvousService.getByMedecin(this.medecinId)
      .subscribe((data: any) => {
        this.rendezvousList = data;
      });
  }, 200); // 200ms
}


  
}

