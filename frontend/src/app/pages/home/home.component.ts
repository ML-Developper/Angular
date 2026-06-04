import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { ModalService } from '../../service/modal.service';
import { NavbarComponent } from "./navbar/navbar.component";
import { BodyComponent } from "./body/body.component";
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, NavbarComponent, BodyComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  

}
