import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RedesSociales } from '../models/redes-sociales';

@Injectable({
  providedIn: 'root'
})
export class RedesSocialesService {
  private apiUrl = 'http://localhost:8000/redes_sociales';

  constructor(private http: HttpClient) { }

  //Obtener todas las RedesSociales desde la BBDD
  getRedesSocialesList(): Observable<RedesSociales[]>{
    return this.http.get<RedesSociales[]>(this.apiUrl)
  }

  //Enviar todas las RedesSociales desde la BBDD
  postRedesSocialesList(redSocial: RedesSociales){

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    const reqestBody = {
      nombre: redSocial.nombre.toString(),
      enlace: redSocial.enlace.toString()
    }

    this.http.post<RedesSociales>(this.apiUrl, reqestBody, {headers})
  }

  //Actualizar todas las RedesSociales desde la BBDD
  putRedesSocialesList(redSocial: RedesSociales){
    this.apiUrl += "/${" + redSocial.id + "}";

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    const reqestBody = {
      nombre: redSocial.nombre.toString(),
      enlace: redSocial.enlace.toString()
    }

    this.http.put<RedesSociales>(this.apiUrl, reqestBody, {headers})
  }
}
