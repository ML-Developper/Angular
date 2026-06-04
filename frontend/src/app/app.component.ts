import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`
})
export class AppComponent  {

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  // ngOnInit(): void {

  //   // ✅ important : only browser
  //   if (!isPlatformBrowser(this.platformId)) {
  //     return;
  //   }

  //   const token = localStorage.getItem('token');
  //   const role = localStorage.getItem('role');

  //   if (!token) {
  //     this.router.navigateByUrl('/home');
  //     return;
  //   }

  //   if (role === 'medecin') {
  //     this.router.navigateByUrl('/medecin-dashboard');
  //   } else {
  //     this.router.navigateByUrl('/accueilpatient');
  //   }
  // }
  ngOnInit(): void {

  if (!isPlatformBrowser(this.platformId)) return;

  const token = localStorage.getItem('token');

  if (!token) return; // ❌ plus de redirect automatique

}
}
