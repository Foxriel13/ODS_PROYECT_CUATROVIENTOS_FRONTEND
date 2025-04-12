import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { IniciativasPorCurso } from '../models/indicadores/iniciativasPorCurso.model';
import { CiclosYModulosConIniciativas } from '../models/indicadores/ciclosYModulosConIniciativas.model';
import { ExplicacionIniciativas } from '../models/indicadores/explicacionIniciativas.model';
import { OdsTrabajadosYSusMetas } from '../models/indicadores/odsTrabajadosYSusMetas.model';
import { TieneEntidadesExternas } from '../models/indicadores/tieneEntidadesExternas.model';
import { TieneRRSS } from '../models/indicadores/tieneRRSS.model';
import { TipoIniciativa } from '../models/indicadores/tipoIniciativa.model';
import { CantIniciativasProfesor } from '../models/indicadores/cantIniciativasProfesor.model';
import { DiferenciaInnovadoresYNo } from '../models/indicadores/diferenciaInnovadoresYNo.model';
import { CantHorasIniciativa } from '../models/indicadores/cantHorasIniciativa.model';
import { HaTenidoActividad } from '../models/indicadores/haTenidoActividad.model';


@Injectable({
  providedIn: 'root'
})
export class IndicadoresService {

  private apiUrl = 'http://localhost:8000/indicadores';

  getIniciativasPorCurso(): Observable<IniciativasPorCurso[]>{
    return this.http.get<IniciativasPorCurso[]>(this.apiUrl + '/iniciativasPorCurso')
  }

  getCantidadIniciativas(): Observable<number[]>{
    return this.http.get<number[]>(this.apiUrl + '/cantidadIniciativas')
  }

  getCiclosYModulosConIniciativas(): Observable<CiclosYModulosConIniciativas[]>{
    return this.http.get<CiclosYModulosConIniciativas[]>(this.apiUrl + '/ciclosYModulosConIniciativas')
  }
  
  getExplicaciónIniciativas(): Observable<ExplicacionIniciativas[]>{
    return this.http.get<ExplicacionIniciativas[]>(this.apiUrl + '/explicacionIniciativas')
  }

  getOdsTrabajadosYSusMetas(): Observable<OdsTrabajadosYSusMetas[]>{
    return this.http.get<OdsTrabajadosYSusMetas[]>(this.apiUrl + '/odsTrabajadosYSusMetas')
  }

  getTieneEntidadesExternas(): Observable<TieneEntidadesExternas[]>{
    return this.http.get<TieneEntidadesExternas[]>(this.apiUrl + '/tieneEntidadesExternas')
  }

  getTieneRRSS(): Observable<TieneRRSS[]>{
    return this.http.get<TieneRRSS[]>(this.apiUrl + '/tieneRRSS')
  }

  getTipoIniciativa(): Observable<TipoIniciativa[]>{
    return this.http.get<TipoIniciativa[]>(this.apiUrl + '/tipoIniciativa')
  }

  getCantProfesores(): Observable<number[]>{
    return this.http.get<number[]>(this.apiUrl + '/cantProfesores')
  }

  getCantIniciativasProfesor(): Observable<CantIniciativasProfesor[]>{
    return this.http.get<CantIniciativasProfesor[]>(this.apiUrl + '/cantIniciativasProfesor')
  }

  getDiferenciaInnovadoresYNo(): Observable<DiferenciaInnovadoresYNo[]>{
    return this.http.get<DiferenciaInnovadoresYNo[]>(this.apiUrl + '/diferenciaInnovadoresYNo')
  }

  getCantHorasIniciativa(): Observable<CantHorasIniciativa[]>{
    return this.http.get<CantHorasIniciativa[]>(this.apiUrl + '/cantHorasIniciativa')
  }

  getHaTenidoActividad(): Observable<HaTenidoActividad[]>{
    return this.http.get<HaTenidoActividad[]>(this.apiUrl + '/haTenidoActividad')
  }

  constructor(private http: HttpClient) { }
}
