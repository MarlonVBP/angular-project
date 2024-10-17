import { Component } from '@angular/core';
import { FooterComponent } from "../../../components/public/footer/footer.component";
import { HeaderPageComponent } from "../../../components/public/header-page/header-page.component";

@Component({
  selector: 'app-contato',
  standalone: true,
  imports: [FooterComponent, HeaderPageComponent],
  templateUrl: './contato.component.html',
  styleUrl: './contato.component.scss'
})
export class ContatoComponent {

}
