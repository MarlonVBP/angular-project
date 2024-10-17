import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ReceitasService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  getRandomRecipes(count: number): Observable<any[]> {
    const requests: Observable<any>[] = [];
    for (let i = 0; i < count; i++) {
      requests.push(this.httpClient.get<any>(this.apiUrl));
    }
    return forkJoin(requests); // Faz todas as requisições em paralelo
  }
}
