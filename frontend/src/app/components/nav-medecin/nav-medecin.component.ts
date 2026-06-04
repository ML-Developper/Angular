import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-medecin',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './nav-medecin.component.html',
  styleUrl: './nav-medecin.component.css'
})
export class NavMedecinComponent {

}
