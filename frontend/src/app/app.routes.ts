import { Routes } from '@angular/router';
import { FormulaireMedecinComponent } from './pages/medecin/formulaire-medecin/formulaire-medecin.component';
import { HomeComponent } from './pages/home/home.component';
import { FormulairePatientComponent } from './pages/patient/formulaire-patient/formulaire-patient.component';
import { ContactezNousComponent } from './pages/contactez-nous/contactez-nous.component';
import { LoginComponent } from './components/login/login.component';
import { AccuielPatientComponent } from './pages/patient/accuiel-patient/accuiel-patient.component';
import { ListPatientComponent } from './pages/medecin/list-patients/list-patients.component';
import { ListMedecinComponent } from './pages/patient/list-medecin/list-medecin.component';
import { PagerendezvousComponent } from './pages/patient/pagerendezvous/pagerendezvous.component';
import { ProfilpatientComponent } from './pages/patient/profilpatient/profilpatient.component';
import { HistoriqueRendezvousComponent } from './pages/patient/historique-rendezvous/historique-rendezvous.component';
import { AccueilMedecinComponent } from './pages/medecin/accueil-medecin/accueil-medecin.component';
import { ListRendezvousComponent } from './pages/medecin/list-rendezvous/list-rendezvous.component';
import { UpdateMedecinComponent } from './pages/medecin/update-medecin/update-medecin.component';
import { UpdatePatientComponent } from './pages/patient/update-patient/update-patient.component';

export const routes: Routes = [

    { path: '', redirectTo: 'home', pathMatch: 'full' },

    { path: 'formedecin', component: FormulaireMedecinComponent },
    { path: 'formpatient', component: FormulairePatientComponent },
    { path: 'home', component: HomeComponent },
    { path: 'contactez-nous', component: ContactezNousComponent },
    { path: 'login', component: LoginComponent },
    { path: 'accueilpatient', component: AccuielPatientComponent },
    { path: 'liste-medecins', component: ListPatientComponent },
    { path: 'liste-patients', component: ListMedecinComponent },
    { path: 'rendezvous', component: PagerendezvousComponent },
    // { path: 'rendezvous/:date', component: PagerendezvousComponent },
    { path: 'profilpatient/:id', component: ProfilpatientComponent },
    { path: 'rendezvous/:id', component: PagerendezvousComponent },
    { path: 'historique-rendezvous', component: HistoriqueRendezvousComponent },
    { path: 'accueil-medecin', component: AccueilMedecinComponent },
    { path: 'medecin/patients', component: ListPatientComponent },
    { path: 'medecin/rendezvous', component: ListRendezvousComponent },
    { path: 'medecin/update/:id', component: UpdateMedecinComponent },
    {
  path: 'update-patient/:id',
  component: UpdatePatientComponent
},











    { path: '**', redirectTo: 'home' }






];
