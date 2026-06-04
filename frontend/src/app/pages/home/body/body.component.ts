import { Component } from '@angular/core';
import { FooterComponent } from "../../../components/footer/footer.component";

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [FooterComponent],
  templateUrl: './body.component.html',
  styleUrl: './body.component.css'
})
export class BodyComponent {

}
