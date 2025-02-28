import { Curso } from './curso.model'
export class Modulos {
    idModulo: number;  // Identificador numérico
    nombre: string;  // Nombre del ODS
    curso: Curso[] | Curso;  // Array de dimensiones, cada una como un objeto de tipo Dimension

    // Constructor para inicializar la clase
    constructor(idModulo: number, nombre: string, curso: Curso[]) {
        this.idModulo = idModulo;
        this.nombre = nombre;
        this.curso = curso;
    }
}
