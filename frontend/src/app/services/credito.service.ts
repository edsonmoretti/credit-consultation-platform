import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Credito, PaginatedResponse } from '../models/credito.model';

@Injectable({
  providedIn: 'root'
})
export class CreditoService {
  private apiUrl = '/api/creditos'; // Adjust base URL if needed, e.g., environment variable

  constructor(private http: HttpClient) {}

  getCreditos(page: number = 0, size: number = 10, sort: string[] = []): Observable<PaginatedResponse<Credito>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    sort.forEach(s => params = params.append('sort', s));

    return this.http.get<PaginatedResponse<Credito>>(this.apiUrl, { params });
  }

  getCreditosByNfse(numeroNfse: string, page: number = 0, size: number = 10, sort: string[] = []): Observable<PaginatedResponse<Credito>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    sort.forEach(s => params = params.append('sort', s));

    return this.http.get<PaginatedResponse<Credito>>(`${this.apiUrl}/${numeroNfse}`, { params });
  }

  getCreditoByNumero(numeroCredito: string): Observable<Credito> {
    return this.http.get<Credito>(`${this.apiUrl}/credito/${numeroCredito}`);
  }
}
