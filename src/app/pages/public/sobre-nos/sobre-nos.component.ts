import { Component } from '@angular/core';
import { FooterComponent } from "../../../components/public/footer/footer.component";
import { HeaderPageComponent } from "../../../components/public/header-page/header-page.component";
import { FabButtonComponent } from "../../../components/public/fab-button/fab-button.component";

@Component({
  selector: 'app-sobre-nos',
  standalone: true,
  imports: [FooterComponent, HeaderPageComponent, FabButtonComponent],
  templateUrl: './sobre-nos.component.html',
  styleUrl: './sobre-nos.component.scss'
})
export class SobreNosComponent {

}
