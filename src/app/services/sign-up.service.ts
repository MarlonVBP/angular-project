import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class SignUpService {
  private readonly secretKey = 'joao-pastal';

  constructor(private snackBar: MatSnackBar, private router: Router) {}

  create(data: any) {
    const encryptedEmail = CryptoJS.AES.encrypt(
      data.email,
      this.secretKey
    ).toString();
    const encryptedNome = CryptoJS.AES.encrypt(
      data.nome,
      this.secretKey
    ).toString();
    const encryptedPassword = CryptoJS.AES.encrypt(
      data.password,
      this.secretKey
    ).toString();

    // Armazenar os dados criptografados no localStorage
    localStorage.setItem('angularProjectUserEmail', encryptedEmail);
    localStorage.setItem('angularProjectUserNome', encryptedNome);
    localStorage.setItem('angularProjectUserPassword', encryptedPassword);

    this.snackBar.open('Sucesso ao cadastrar.', 'Fechar', {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
    });
    this.router.navigate(['/login']);
  }

  update(data: any) {
    const encryptedEmail = CryptoJS.AES.encrypt(
      data.email,
      this.secretKey
    ).toString();
    const encryptedPassword = CryptoJS.AES.encrypt(
      data.password,
      this.secretKey
    ).toString();

    // Armazenar os dados criptografados no localStorage
    localStorage.setItem('angularProjectUserEmail', encryptedEmail);
    localStorage.setItem('angularProjectUserPassword', encryptedPassword);

    this.snackBar.open('Dados alterados com sucesso.', 'Fechar', {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
    });
  }
}
