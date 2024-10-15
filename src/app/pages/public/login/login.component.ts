import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(255),
    ]),
  });

  eye: string = 'assets/images/eye-open.svg';
  typeInput: string = 'password';
  showPassword() {
    this.typeInput = this.typeInput == 'password' ? 'text' : 'password';
    this.eye =
      this.eye == 'assets/images/eye-open.svg'
        ? 'assets/images/eye-close.svg'
        : 'assets/images/eye-open.svg';
  }

  signUp() {
    this.router.navigate(['sign-up']);
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const login = {
      email: this.loginForm.value.email,
      senha: this.loginForm.value.password,
    };

    this.authService.logar(login).subscribe((data: any) => {
      console.log(data);
      if (data.success == '1') {
        this.snackBar.open('Sucesso ao logar.', 'Fechar', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
        });
        this.authService.autorizar(data.response);
        this.router.navigate(['/admin-home']);
        return;
      }
      this.snackBar.open(data.message + '.', 'Fechar', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      });
    });
  }
}
