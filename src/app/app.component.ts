import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SplashScreenComponen } from "./components/splash-screen/splash-screen.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SplashScreenComponen],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-project';
}
