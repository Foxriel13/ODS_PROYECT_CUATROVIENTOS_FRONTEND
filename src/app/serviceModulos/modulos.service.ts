import { Injectable } from '@angular/core';
import { Modulos } from '../models/modulos.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModulosService {

  private apiUrl = 'http://localhost:8000/modulos'; // Reemplaza con tu URL de API
    private modulo :Modulos[] = [];
     constructor(private http: HttpClient) { }
   
     // Obtener todos los ODS de la base de datos
     getModulosList(): Observable<Modulos[]> {
       return this.http.get<Modulos[]>(this.apiUrl);
     }
   
     //Obtener por Id
     getModulosListById(id: number): Observable<Modulos[]> {
       let url = this.apiUrl + "/${" + id + "}";
       return this.http.get<Modulos[]>(url);
     }

     createModulo(modulo: Modulos): Observable<Modulos> {
      console.log(modulo);
  
      // Creamos el objeto que será enviado en el cuerpo del POST
      const requestBody = {
        nombreModulo: modulo.nombre,
        modulos: modulo.clase.map(clase => clase.id),
      };
  
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  
      return this.http.post<Modulos>(this.apiUrl, requestBody, { headers }).pipe(
        tap(data => {
          console.log('Iniciativa creada:', data);
          this.modulo.push(data);  // Suponiendo que 'this.iniciativas' es un array donde guardas las iniciativas
        }),
        catchError(error => {
          console.error('Error en la solicitud POST:', error);
          return throwError(error);
        })
      );
    }
   }