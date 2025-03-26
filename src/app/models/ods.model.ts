import { Dimension } from "./dimension.model";  // Asegúrate de que la ruta sea correcta

export class Ods {
    idOds: number;  // Identificador numérico
    nombre: string;  // Nombre del ODS
    dimension: string;  // Array de dimensiones, cada una como un objeto de tipo Dimension

    // Constructor para inicializar la clase
    constructor(idOds: number, nombre: string, dimension: string) {
        this.idOds = idOds;
        this.nombre = nombre;
        this.dimension = dimension;
    }
}
