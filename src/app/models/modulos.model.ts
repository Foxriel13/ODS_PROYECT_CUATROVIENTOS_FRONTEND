import { Curso } from './curso.model'

export class Modulos {
    id: number;  // Identificador numérico
    nombre: string;  // Nombre del ODS
    clases: Curso[]; 
    // Constructor para inicializar la clases
    constructor(id: number, nombre: string, clases: Curso[]) {
        this.id = id;
        this.nombre = nombre;
        this.clases = clases;
    }
}



