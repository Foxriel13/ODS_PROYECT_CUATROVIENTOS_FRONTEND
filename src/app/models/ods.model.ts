import { Dimension } from "./dimension.model";  // Asegúrate de que la ruta sea correcta

export class Ods {
    idOds: number;  // Identificador numérico
    nombre: string;  // Nombre del ODS
    dimension: Dimension[];  // Array de dimensiones, cada una como un objeto de tipo Dimension

    // Constructor para inicializar la clase
    constructor(idOds: number, nombre: string, dimension: Dimension[]) {
        this.idOds = idOds;
        this.nombre = nombre;
        this.dimension = dimension;
    }
}
