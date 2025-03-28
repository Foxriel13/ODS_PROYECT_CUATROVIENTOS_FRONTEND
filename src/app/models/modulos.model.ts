import { Curso } from './curso.model'

export class Modulos {
    id: number;  // Identificador numérico
    nombre: string;  // Nombre del ODS
    clase: Curso[];  // Array de dimensiones, cada una como un objeto de tipo Dimension

    // Constructor para inicializar la clase
    constructor(id: number, nombre: string, clase: Curso[]) {
        this.id = id;
        this.nombre = nombre;
        this.clase = clase;
    }
}



