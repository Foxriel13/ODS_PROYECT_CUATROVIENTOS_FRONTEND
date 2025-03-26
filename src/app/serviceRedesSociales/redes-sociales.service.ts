import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Redes_Sociales } from '../models/redes_sociales';

@Injectable({
  providedIn: 'root'
})
export class RedesSocialesService {
  private apiUrl = 'http://localhost:8000/redes_sociales';

  constructor(private http: HttpClient) { }

  //Obtener todas las RedesSociales desde la BBDD
  getRedesSocialesList(): Observable<Redes_Sociales[]>{
    return this.http.get<Redes_Sociales[]>(this.apiUrl)
  }

  //Enviar todas las RedesSociales desde la BBDD
  postRedesSocialesList(redSocial: Redes_Sociales){

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    const reqestBody = {
      nombre: redSocial.nombre.toString(),
      enlace: redSocial.enlace.toString()
    }

    this.http.post<Redes_Sociales>(this.apiUrl, reqestBody, {headers})
  }

  //Actualizar todas las RedesSociales desde la BBDD
  putRedesSocialesList(redSocial: Redes_Sociales){
    this.apiUrl += "/${" + redSocial.id + "}";

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    const reqestBody = {
      nombre: redSocial.nombre.toString(),
      enlace: redSocial.enlace.toString()
    }

    this.http.put<Redes_Sociales>(this.apiUrl, reqestBody, {headers})
  }
}
