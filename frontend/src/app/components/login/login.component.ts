import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../pages/home/navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavbarComponent, FooterComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      isMedecin: [false]
    });

  }

  login() {

  if (this.loginForm.invalid) {
    Swal.fire("Erreur", "Formulaire invalide", "error");
    return;
  }

  const formValue = this.loginForm.value;

 const payload = {
  email: formValue.email.trim(),
  password: formValue.password,
  role: formValue.isMedecin ? 'medecin' : 'patient'
};
  console.log("PAYLOAD =", payload);

  this.authService.login(payload).subscribe({
    next: (res: any) => {

      this.authService.setToken(res.token);
      this.authService.setRole(payload.role);
      this.authService.setUser(res.user);

      const route = payload.role === 'medecin'
        ? '/accueil-medecin'
        : '/accueilpatient';

      this.router.navigateByUrl(route, { replaceUrl: true });
    },

    error: (err) => {
      Swal.fire("Erreur", err.error?.message || "Login échoué", "error");
      console.log(err.error);
    }
  });
}

}

