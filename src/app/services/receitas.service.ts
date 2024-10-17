import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReceitasService {
  private readonly apiUrl = environment.apiReceitasUrl;

  constructor(private httpClient: HttpClient) {}

  select(): Observable<any> {
    return this.httpClient.get<any>(`/api/receitas/todas`);
  }
}
