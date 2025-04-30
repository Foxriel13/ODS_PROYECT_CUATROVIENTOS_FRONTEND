import { elementAt } from "rxjs";

export class Ods {
    idOds: number;  // Identificador numérico
    nombre: string;  // Nombre del ODS
    dimension: string;  // Array de dimensiones, cada una como un objeto de tipo Dimension
    eliminado: boolean;
    // Constructor para inicializar la clase
    constructor(idOds: number, nombre: string, dimension: string, eliminado: boolean) {
        this.idOds = idOds;
        this.nombre = nombre;
        this.dimension = dimension;
        this.eliminado = eliminado;
    }
}
