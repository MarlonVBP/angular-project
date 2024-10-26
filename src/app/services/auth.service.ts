import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly secretKey = 'Y7f!8Kp2$hS@jB1xL3zR^vW9qTm&XcN';

  constructor(private snackBar: MatSnackBar, private router: Router) {}

  deslogar() {
    localStorage.clear();
  }

  statusLogin() {
    if (localStorage.getItem('angularProjectUserPassword')) {
      return true;
    }
    return false;
  }

  decrypt(encryptedData: string): string {
    const bytes = CryptoJS.AES.decrypt(encryptedData, this.secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  logar(login: any) {
    const storedEncryptedEmail = localStorage.getItem(
      'angularProjectUserEmail'
    );
    const storedEncryptedPassword = localStorage.getItem(
      'angularProjectUserPassword'
    );

    if (storedEncryptedEmail && storedEncryptedPassword) {
      const decryptedEmail = this.decrypt(storedEncryptedEmail);
      const decryptedPassword = this.decrypt(storedEncryptedPassword);

      if (login.email === decryptedEmail && login.senha === decryptedPassword) {
        this.router.navigate(['/']);
        return;
      }
    }

    this.snackBar.open('Email ou senha inválidos', 'Fechar', {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
    });
  }
}
