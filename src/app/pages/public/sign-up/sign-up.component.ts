import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { trigger, transition, style, animate } from '@angular/animations';
import { SignUpService } from '../../../services/sign-up.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate(
          '0.5s ease-in',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  constructor(
    private router: Router,
    private signUpServ: SignUpService,
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
    const password = passwordInput ? passwordInput.value : '';
    const confirmPasswordInput = document.getElementById(
      'confirm-password'
    ) as HTMLInputElement;
    const confirmPassword = confirmPasswordInput
      ? confirmPasswordInput.value
      : '';
    this.mismatch = password === confirmPassword ? false : true;
  }

  signUpForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    nome: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30),
    ]),
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
      nome: this.signUpForm.value.nome,
      password: this.signUpForm.value.password,
    };

    this.signUpServ.create(login);
  }
}
