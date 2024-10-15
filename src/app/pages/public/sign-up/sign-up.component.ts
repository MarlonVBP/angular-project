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
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  constructor(
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.signUpForm.get('confirmPassword')?.valueChanges.subscribe((value) => {
      this.passwordMatchValidator();
    });
    this.signUpForm.get('password')?.valueChanges.subscribe((value) => {
      this.passwordMatchValidator();
    });
  }

  mismatch: boolean = false;

  passwordMatchValidator() {
    const passwordInput = document.getElementById(
      'password'
    ) as HTMLInputElement;
    const password = passwordInput ? passwordInput.value : null;
    const confirmPasswordInput = document.getElementById(
      'confirm-password'
    ) as HTMLInputElement;
    const confirmPassword = confirmPasswordInput
      ? confirmPasswordInput.value
      : null;
    this.mismatch = password === confirmPassword ? false : true;
  }

  signUpForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(255),
    ]),
    confirmPassword: new FormControl('', [
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

  eyeConfirm: string = 'assets/images/eye-open.svg';
  typeInputConfirm: string = 'password';
  showConfirmPassword() {
    this.typeInputConfirm =
      this.typeInputConfirm == 'password' ? 'text' : 'password';
    this.eyeConfirm =
      this.eyeConfirm == 'assets/images/eye-open.svg'
        ? 'assets/images/eye-close.svg'
        : 'assets/images/eye-open.svg';
  }

  login() {
    this.router.navigate(['login']);
  }

  onSubmit() {
    if (this.signUpForm.invalid) {
      this.signUpForm.markAllAsTouched();
      return;
    }

    const login = {
      email: this.signUpForm.value.email,
      password: this.signUpForm.value.password,
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
        this.router.navigate(['']);
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
