import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor() {}

  eye: string = 'images/eye-open.svg'
  typeInput: string = 'password'
  showPassword(){
    this.typeInput = this.typeInput == 'password' ? 'text' : 'password';
    this.eye = this.eye == 'images/eye-open.svg' ? 'images/eye-close.svg' : 'images/eye-open.svg'
  }
}
