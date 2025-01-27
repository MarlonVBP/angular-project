import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../../../components/public/footer/footer.component';
import { HeaderPageComponent } from '../../../components/public/header-page/header-page.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import CryptoJS from 'crypto-js';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-contato',
  standalone: true,
  imports: [
    FooterComponent,
    HeaderPageComponent,
    ReactiveFormsModule,
    CommonModule,
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
  templateUrl: './contato.component.html',
  styleUrl: './contato.component.scss',
})
export class ContatoComponent implements OnInit {
  private readonly secretKey = 'Y7f!8Kp2$hS@jB1xL3zR^vW9qTm&XcN';
  constructor(private snackBar: MatSnackBar) {}

  email: string = '';
  name: string = '';

  ngOnInit() {
    this.email = this.decrypt(localStorage.getItem('angularProjectUserEmail') || '');
    this.name = this.decrypt(localStorage.getItem('angularProjectUserNome') || '');

    this.contactForm.patchValue({
      email: this.email,
      name: this.name,
    });
  }

  decrypt(encryptedData: string): string {
    const bytes = CryptoJS.AES.decrypt(encryptedData, this.secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  contactForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', [
      Validators.required,
      Validators.maxLength(50),
      Validators.minLength(3),
    ]),
    category: new FormControl('', [Validators.required]),
    message: new FormControl('', [
      Validators.required,
      Validators.maxLength(255),
      Validators.minLength(10),
    ]),
  });

  onSubmit() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      this.snackBar.open('Falha ao enviar a mensagem.', 'Fechar', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      });
      return;
    }

    this.snackBar.open('Mensagem enviada com sucesso.', 'Fechar', {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
    });
    this.contactForm.reset();
  }
}
