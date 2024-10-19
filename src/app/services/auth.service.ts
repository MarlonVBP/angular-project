import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = environment.apiUrl + '/admin/';
  private readonly secretKey = 'joao-pastal';

  constructor(
    private httpClient: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  autorizado = false;

  autorizar(response: any) {
    localStorage.setItem('token', response.token);
    localStorage.setItem('email', response.email);
    localStorage.setItem('nome', response.nome);
  }

  deslogar() {
    localStorage.clear();
  }

  statusLogin() {
    if (localStorage.getItem('angularProjectUserPassword')) {
    return true
    }
    return false
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
        this.snackBar.open('Sucesso ao logar', 'Fechar', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
        });

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

  resetarSenha(novaSenha: any, token: any) {
    return this.httpClient.post(
      this.apiUrl + 'resetar-senha/resetar-senha.php',
      { token: token, new_password: novaSenha }
    );
  }

  sendResetPasswordLink(email: string) {
    return this.httpClient.post(
      this.apiUrl + 'resetar-senha/request_password_reset.php',
      { email: email }
    );
  }
}
