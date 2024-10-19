import { Component } from '@angular/core';

@Component({
  selector: 'app-fab-button',
  standalone: true,
  imports: [],
  templateUrl: './fab-button.component.html',
  styleUrl: './fab-button.component.scss',
})
export class FabButtonComponent {
  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}
