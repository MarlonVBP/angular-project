import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = environment.apiUrl + '/admin/';

  constructor(private httpClient: HttpClient) {}

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
    let token = localStorage.getItem('token');
    return this.httpClient.post(this.apiUrl + 'login/verificarlogin.php', {
      token: token,
    });
  }

  logar(login: any) {
    console.log(login);
    return this.httpClient.post(this.apiUrl + 'login/logar.php', login);
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
