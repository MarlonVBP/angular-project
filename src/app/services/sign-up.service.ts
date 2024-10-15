import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SignUpService {
  private readonly apiUrl = environment.apiUrl + '/admin/sign-up/';

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  create(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}create.php`, data);
  }
}
