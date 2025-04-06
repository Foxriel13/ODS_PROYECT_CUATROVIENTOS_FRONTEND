import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IndicadoresService {

  private apiUrl = 'http://localhost:8000/indicadores';

  getIniciativasPorCurso(): Observable<object>{
    return this.http.get(this.apiUrl + '/iniciativasPorCurso')
  }

  getNumeroIniciativas(): Observable<object>{
    return this.http.get(this.apiUrl + '/cantidadIniciativas')
  }

  getCiclosYModulosConIniciativas(): Observable<object>{
    return this.http.get(this.apiUrl + '/ciclosYModulosConIniciativas')
  }
  
  getExplicaciónIniciativas(): Observable<object>{
    return this.http.get(this.apiUrl + '/explicacionIniciativas')
  }

  getOdsTrabajadosYSusMetas(): Observable<object>{
    return this.http.get(this.apiUrl + '/odsTrabajadosYSusMetas')
  }

  getTieneEntidadesExternas(): Observable<object>{
    return this.http.get(this.apiUrl + '/tieneEntidadesExternas')
  }

  getTieneRRSS(): Observable<object>{
    return this.http.get(this.apiUrl + '/tieneRRSS')
  }

  getTipoIniciativa(): Observable<object>{
    return this.http.get(this.apiUrl + '/tipoIniciativa')
  }

  getCantProfesores(): Observable<object>{
    return this.http.get(this.apiUrl + '/cantProfesores')
  }

  getCantIniciativasProfesor(): Observable<object>{
    return this.http.get(this.apiUrl + '/cantIniciativasProfesor')
  }

  getDiferenciaInnovadoresYNo(): Observable<object>{
    return this.http.get(this.apiUrl + '/diferenciaInnovadoresYNo')
  }

  getCantHorasIniciativa(): Observable<object>{
    return this.http.get(this.apiUrl + '/cantHorasIniciativa')
  }

  getHaTenidoActividad(): Observable<object>{
    return this.http.get(this.apiUrl + '/haTenidoActividad')
  }

  constructor(private http: HttpClient) { }
}
