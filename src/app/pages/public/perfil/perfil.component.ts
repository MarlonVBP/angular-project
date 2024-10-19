import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import CryptoJS from 'crypto-js';
import { SignUpService } from '../../../services/sign-up.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HeaderPageComponent } from '../../../components/public/header-page/header-page.component';
import { trigger, transition, style, animate } from '@angular/animations';
import { FooterComponent } from '../../../components/public/footer/footer.component';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HeaderPageComponent,
    FooterComponent,
  ],
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
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss',
})
export class PerfilComponent {
  private readonly secretKey = 'Y7f!8Kp2$hS@jB1xL3zR^vW9qTm&XcN';

  images: string[] = [
    'https://images.pexels.com/photos/28902884/pexels-photo-28902884.jpeg',
    'https://images.pexels.com/photos/28889844/pexels-photo-28889844.jpeg',
    'https://images.pexels.com/photos/227908/pexels-photo-227908.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/3877666/pexels-photo-3877666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/3877666/pexels-photo-3877666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/28962798/pexels-photo-28962798/free-photo-of-close-up-de-fatias-de-pizza-de-calabresa-e-queijo.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/28895983/pexels-photo-28895983.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  ];

  imagemDePerfil: string = '';
  email: string = '';
  nome: string = '';

  ngOnInit() {
    this.imagemDePerfil = this.images[Math.floor(Math.random() * 7)];
    this.email = this.decrypt(localStorage.getItem('angularProjectUserEmail')!);
    this.nome = this.decrypt(localStorage.getItem('angularProjectUserNome')!);
  }

  decrypt(encryptedData: string): string {
    const bytes = CryptoJS.AES.decrypt(encryptedData, this.secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  constructor(
    private signUpServ: SignUpService,
    private snackBar: MatSnackBar
  ) {
    this.perfilForm.get('confirmPassword')?.valueChanges.subscribe((value) => {
      this.passwordMatchValidator();
    });
    this.perfilForm.get('password')?.valueChanges.subscribe((value) => {
      this.passwordMatchValidator();
    });
  }

  perfilForm = new FormGroup({
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

  onSubmit() {
    if (this.perfilForm.invalid) {
      this.perfilForm.markAllAsTouched();
      return;
    }

    const login = {
      email: this.perfilForm.value.email,
      password: this.perfilForm.value.password,
    };

    this.signUpServ.update(login);

    this.perfilForm.reset();
  }
}
