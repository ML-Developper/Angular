import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavbarComponent } from "../../pages/home/navbar/navbar.component";
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-contactez-nous',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './contactez-nous.component.html',
  styleUrl: './contactez-nous.component.css'
})
export class ContactezNousComponent {
contactForm!: FormGroup;

  adresseInfos = [
    {
      text: 'Tunis',
      iconPath: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z'
    },
    {
      text: '94 902 504',
      iconPath: 'M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.18 21 3 13.82 3 5a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.25 1.01l-2.2 2.2z'
    },
    {
      text: 'info@lerdvmedical.tn',
      iconPath: 'M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z'
    }
  ];

  constructor(private fb: FormBuilder) {}

  

  ngOnInit(): void {

    
    this.contactForm = this.fb.group({
      nom:     ['', Validators.required],
      email:   ['', [Validators.required, Validators.email]],
      sujet:   ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  isInvalid(field: string): boolean {
    const control = this.contactForm.get(field);
    return !!(control?.invalid && control?.touched);
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      console.log('Formulaire envoyé :', this.contactForm.value);
      // this.contactService.send(this.contactForm.value).subscribe(...)
      this.contactForm.reset();
    } else {
      this.contactForm.markAllAsTouched();
    }
  }
}
