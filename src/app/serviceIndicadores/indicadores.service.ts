import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IndicadoresService {

  private apiUrl = 'http://localhost:8000/indicadores';
  private numeroIniciativas = 0;

  getNumeroIniciativas(): Observable<object>{
    return this.http.get(this.apiUrl + '/cantidadIniciativas')
  }

  constructor(private http: HttpClient) { }
}
