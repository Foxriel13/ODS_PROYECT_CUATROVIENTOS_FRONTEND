// src/app/models/dimension.model.ts
export class Dimension {
    idDimension: number;  // Definido como número si es un identificador
    nombre: string;  // El nombre de la dimensión

    // Constructor para inicializar la clase
    constructor(idDimension: number, nombre: string) {
        this.idDimension = idDimension;
        this.nombre = nombre;
    }
}
